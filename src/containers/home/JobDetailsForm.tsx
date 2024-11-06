import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormInput from "../../components/formComponents/FormInput";
import { useFormik } from "formik";
import * as Yup from "yup";
import { PageNumbers } from "../../interface/home";
import { IJobDetails } from "../../interface/forms";
import { useData } from "./DataProvider";

const JobDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const { state, setState } = useData(); // Access state and setter from context

  // Use formik to manage form state
  const formik = useFormik<IJobDetails>({
    initialValues: {
      jobTitle: state.jobDetails?.jobTitle || "",
      jobDetails: state.jobDetails?.jobDetails || "",
      jobLocation: state.jobDetails?.jobLocation || "",
    },
    validationSchema: Yup.object().shape({
      jobTitle: Yup.string().required("Job Title is required"),
      jobDetails: Yup.string().required("Job Details are required"),
      jobLocation: Yup.string().required("Job Location is required"),
      // Since there was no jobPosition field in the initial values or the form structure, I removed the validation for jobPosition from the validationSchema so that i will move to the interview settings ...
      // jobPosition: Yup.string().required("Job position is required"),⁡
    }),
    onSubmit: (values) => {
      // Update context with form values before submitting
      setState((prevState) => ({
        ...prevState,
        jobDetails: values,
      }));
      handleTab(2); // Move to the next tab
    },
  });

  // Function to handle field changes and update both form state and context
  const handleFieldChange = (
    e: React.ChangeEvent<HTMLInputElement> | null,
    fieldName?: string,
    fieldValue?: string
  ) => {
    const updatedValue = fieldValue || (e ? e.target.value : undefined);
    const updatedFieldName = fieldName || (e ? e.target.name : undefined);

    if (updatedFieldName && updatedValue) {
      formik.setFieldValue(updatedFieldName, updatedValue);
      setState((prevState) => ({
        ...prevState,
        jobDetails: {
          ...prevState.jobDetails,
          [updatedFieldName]: updatedValue,
        },
      }));
    }
  };

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit as any}>
      <Box width="100%">
        <FormInput
          label="Job Title"
          placeholder="Enter job title"
          name="jobTitle"
          onChange={handleFieldChange}
          onBlur={formik.handleBlur}
          value={formik.values.jobTitle}
          error={formik.errors.jobTitle}
          touched={formik.touched.jobTitle}
        />
        <FormInput
          label="Job Details"
          placeholder="Enter job details"
          name="jobDetails"
          onChange={handleFieldChange}
          onBlur={formik.handleBlur}
          value={formik.values.jobDetails}
          error={formik.errors.jobDetails}
          touched={formik.touched.jobDetails}
        />
        <FormInput
          label="Job Location"
          name="jobLocation"
          placeholder="Enter job location"
          onChange={handleFieldChange}
          onBlur={formik.handleBlur}
          error={formik.errors.jobLocation}
          touched={formik.touched.jobLocation}
          value={formik.values.jobLocation}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(0)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Next
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default JobDetailsForm;
