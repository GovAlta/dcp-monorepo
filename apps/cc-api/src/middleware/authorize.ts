export const VALUE_SERVICE = {
  READ: ['urn:ads:platform:value-service:value-reader'],
  WRITE: ['urn:ads:platform:value-service:value-writer']
}

/**
 * Middleware to authorize access based on user roles.
 * 
 * @param {string[]} allowedRoles - Array of roles that are allowed to access the resource.
 * 
 * This middleware checks if the authenticated user has all the roles specified in the allowedRoles array.
 * If the user has the necessary roles, it calls the next middleware function.
 * Otherwise, it responds with a 403 status code and an error message.
 * 
 * NOTE: Empty array means no role is checked
 * 
 * Roles should be in the format of `${ADSP service URN id}:${permission}`.
 * For a list of service URN ids and permissions see https://govalta.github.io/adsp-monorepo/services/services.html
 */

export default function authorize(allowedRoles: string[]) {
    return (req, res, next) => {
      const { user } = req
  
      if (allowedRoles && allowedRoles.every((role) => user?.roles?.includes(role))) {
        next();
      } else {
        res.status(403).json({message: "You do not have permission to access this resource."});
      }
    }
  }