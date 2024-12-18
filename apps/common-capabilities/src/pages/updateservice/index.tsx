import React, { useEffect, useMemo } from 'react';
import ServiceFormWrapper from '../../components/ServiceForm/ServiceFormWrapper';
import { Service } from '../../types/types';
import useFetch from '../../hooks/useFetch';
import { GoACircularProgress } from '@abgov/react-components';
import useForm from '../../hooks/useFormSubmit';
import { getApiUrl } from '../../utils/configs';
import BackButton from '../../components/BackButton';

type ServiceDetailsResponse = {
  serviceInfo: Service
}

export default function UpdateServicePage(): JSX.Element {
  const { handleSubmit } = useForm();
  const id = React.useMemo(() => {
    const urlSearchParams  = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params.id;
  }, []);
  const serviceUrl = useMemo(() => getApiUrl(`/listings/services/${id}`), []);
  const [data, error, isLoading] = useFetch<ServiceDetailsResponse>(serviceUrl);
  const [service, setService] = React.useState<Service | undefined>(undefined);

  useEffect(() => {
    if (!isLoading && data) {
      // editor name and email needs to be of current editing user, thus needs to be cleared out from loaded data
      const serviceInfo = Object.assign({}, data.serviceInfo, { editorName: "", editorEmail: "" });
      setService(serviceInfo);
    }
  }, [data, isLoading]);

  const backLink = <BackButton text="Back to details" onClick={() => { history.back(); }} />;

  return isLoading || !service ? (
    <GoACircularProgress variant="fullscreen" size="large" message="Loading service details..." visible={true} />
  ) : (
    <ServiceFormWrapper
      backLink={backLink}
      pageHeader={`Update ${service.serviceName}`}
      service={service}
      handleSubmit={handleSubmit}
    />
  );
}
