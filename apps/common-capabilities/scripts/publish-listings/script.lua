-- The script is triggered by a form-service:submission-dispositioned event,
-- with the corr  esponding payload as the input.

-- Define Namespace and Name used for values
local publishedIndex = "published-index"
local namespace = "common-capabilities"
local debug="Done"

-- Helper functions
function hasKeys(table, ...)
  local args = {...}
  local tmp = table
  for _, k in ipairs(args) do
   if not pcall(function() return tmp[k] end) then
      return false 
    end
    tmp = tmp[k]
  end
  return true
end

function trace(message)
    adsp.SendDomainEvent("common-capabilities", "trace", nil, nil, { ["message"] = message })
end

function contains(index, appId)
  for _, id in pairs(index) do
    if appId == id then
      return true
    end
  end
  return false
end

function addIndex(oldIndex, value)
  table.insert(oldIndex, value)
  local newValue = {
    ["correlationId"] = "", 
    ["context"] = {},
    ["value"]= {["index"] = oldIndex}
  }
  adsp.WriteValue(namespace, publishedIndex, newValue)
end

-- Make life easy; convert a C# list to a Lua array
function ToLuaArray(dotNetList)
  local luaArray = {}
  for i = 0, dotNetList.Count - 1 do
    table.insert(luaArray, dotNetList:get_Item(i))
  end
  return luaArray
end

function validateIndex(appId, index)
  if not hasKeys(index, "page", "size") then
    trace("No value found for '"..appId.."'' listng")
    error("500 (Internal server error)")
  end
end

function updateIndex(appId)
  local rawValue = adsp.ReadValue(namespace, publishedIndex, 1)
  validateIndex(appId, rawValue)
  if rawValue["page"]["size"] == 0 then
    addIndex({}, appId)
    trace("First index entry for "..namespace.." ("..appId..") added")
  else
    if not hasKeys(rawValue, namespace, publishedIndex, 0, "value", "index") then
      trace("No index found for '"..appId.."'' listng")
      error("500 (Internal server error)")
    end
    local index = ToLuaArray(rawValue[namespace][publishedIndex][0].value.index)
    if not contains(index, appId) then
        addIndex(index, appId)
        trace("New index ("..appId..") was added")
    end
  end
end

-- One of these gets returned from c#; lets be safe
function isNilOrNull(value)
    return value == nil or value == null
end

function validateFormData(formId, formData)
  if 
    isNilOrNull(formData)
    or not hasKeys(formData, "data")
    or isNilOrNull(formData["data"]) 
    or not hasKeys(formData["data"], "appId")
    or isNilOrNull(formData["data"]["appId"])
    or not hasKeys(formData["data"], "editorName")
    or not hasKeys(formData["data"], "editorEmail")
    or not hasKeys(formData["data"], "serviceName")
  then
    trace("Form '"..formId.."' not found or has invalid data.")
    error("404 (Not Found)")
  end
 end

function getFormData(formId, disposition)
  local formData = adsp.GetFormData(formId)
  validateFormData(formId, formData)
  return { 
    name = formData.data.editorName,
    emailAddress = formData.data.editorEmail,
    appId = formData.data.appId,
    status = disposition.status,
    reason = disposition.reason,
    serviceName = formData.data.serviceName,
    data = formData.data
  }
end

function validatePayload(inputs)
  if not hasKeys(inputs, "form", "id") then
    trace("Form Id is not present in event payload")
    error("400 (Bad Request)")
  end
  if not hasKeys(inputs, "submission", "disposition") then
    trace("Disposition is not present in event payload")
    error("400 (Bad Request)")
  end
  local disposition = inputs.submission.disposition
  if not hasKeys(disposition, "status") or not hasKeys(disposition, "reason") then
    trace("Disposition is not present in event payload")
    error("400 (Bad Request)")
  end
end

function updateFormData(data)
  local value = { 
    ["correlationId"] = '',
    ["context"] = {},
    ["value"] = data
  }
  adsp.WriteValue(namespace, data.appId, value)
  trace("Listing for form '"..data.appId.."' was updated")
end

function triggerNotification(eventType, formData)
    local payload = {
      ["userName"] = formData.name,
      ["userEmail"] = formData.emailAddress,
      ["reason"] = formData.reason,
      ["appName"] = formData.serviceName
    }
    adsp.SendDomainEvent("common-capabilities", eventType, nil, nil, payload)
end

-- Main --
validatePayload(inputs)
local formId = inputs.form.id
local disposition = inputs.submission.disposition
local status = disposition.status
local reason = disposition.reason
local formData = getFormData(formId, disposition)
if status == "accepted" then
  updateIndex(formData.appId)
  updateFormData(formData.data)
  triggerNotification("listing-accepted", formData)
else
  triggerNotification("listing-rejected", formData)
end

return debug