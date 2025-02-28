import React, { useEffect, useMemo } from 'react';
import ServiceFormWrapper from '../../components/ServiceForm/ServiceFormWrapper';
import useFetch from '../../hooks/useFetch';
import { GoACircularProgress, GoANotification } from '@abgov/react-components';
import useForm from '../../hooks/useFormSubmit';
import { getApiUrl } from '../../utils/configs';
import BackButton from '../../components/BackButton';
import type { Service } from '../../types/types';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../providers/AuthStateProvider';

type ServiceDetailsResponse = {
    serviceInfo: Service;
};

export default function UpdateServicePage(): JSX.Element {
    const { id } = useParams();
    const { handleSubmit } = useForm();
    const { authToken } = useAuth();
    const serviceUrl = useMemo(
        () => getApiUrl(`/listings/services/${id}`),
        [id],
    );
    const [data, error, isLoading] = useFetch<ServiceDetailsResponse>(
        serviceUrl,
        { headers: { Authorization: `Bearer ${authToken}` } },
    );
    const [service, setService] = React.useState<Service | undefined>(
        undefined,
    );

    useEffect(() => {
        if (!isLoading && data) {
            // editor name and email needs to be of current editing user, thus needs to be cleared out from loaded data
            const serviceInfo = Object.assign({}, data.serviceInfo, {
                editorName: '',
                editorEmail: '',
            });
            setService(serviceInfo);
        }
    }, [data, isLoading]);

    const backLink = (
        <BackButton
            text="Back to details"
            onClick={() => {
                history.back();
            }}
        />
    );

    let content;

    if (isLoading || (!service && !error)) {
        content = (
            <GoACircularProgress
                variant="fullscreen"
                size="large"
                message="Loading service details..."
                visible={true}
            />
        );
    } else if (service) {
        content = (
            <ServiceFormWrapper
                backLink={backLink}
                pageHeader={`Update ${service.serviceName}`}
                service={service}
                handleSubmit={(data) => handleSubmit(data, authToken)}
            />
        );
    } else {
        content = (
            <GoANotification type="emergency" ariaLive="assertive">
                Failed to load service details. Please try again later.
            </GoANotification>
        );
    }

    return content;
}
