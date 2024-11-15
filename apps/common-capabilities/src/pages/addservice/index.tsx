import React from 'react';
import ServiceFormWrapper from '../../components/ServiceForm/ServiceFormWrapper';
import useForm from '../../hooks/useFormSubmit';

export default function AddServicePage() {
  const { handleSubmit } = useForm();

  return (
    <ServiceFormWrapper
      pageHeader="Add Service"
      handleSubmit={handleSubmit}
    />
  );
}
