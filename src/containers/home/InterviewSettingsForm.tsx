import { Button, Flex, Box } from "@chakra-ui/react";
import React from "react";
import FormSelect from "../../components/formComponents/FormSelect";
import { useFormik } from "formik";
import { PageNumbers } from "../../interface/home";
import { IInterViewSettings } from "../../interface/forms";
import {
  interviewDurationOptions,
  interviewLanguageOptions,
  interviewModeOptions,
} from "./constants";
import { useData } from "./DataProvider";

const InterviewDetailsForm: React.FC<{
  handleTab: (n: PageNumbers) => void;
}> = ({ handleTab }) => {
  const { state, setState } = useData();

  const formik = useFormik<IInterViewSettings>({
    initialValues: {
      interviewMode: state.interviewSettings?.interviewMode || "",
      interviewDuration: state.interviewSettings?.interviewDuration || "",
      interviewLanguage: state.interviewSettings?.interviewLanguage || "",
    },
    onSubmit: (values) => {
      console.log({ values });
      alert("Form successfully submitted");
    },
  });

  // Update the state and form values for the interview settings
  const handleFieldChange = (fieldName: string, fieldValue: string) => {
    formik.setFieldValue(fieldName, fieldValue); // Update formik values
    setState((prevState) => ({
      ...prevState,
      interviewSettings: {
        ...prevState.interviewSettings,
        [fieldName]: fieldValue,
      },
    })); // Update context state
  };

  return (
    <Box width="100%" as="form" onSubmit={formik.handleSubmit as any}>
      <Box width="100%">
        <FormSelect
          label="Interview Mode"
          placeholder="Select interview mode"
          name="interviewMode"
          options={interviewModeOptions}
          onChange={(fieldName: string, fieldValue: string) => {
            handleFieldChange(fieldName, fieldValue);
          }}
          onBlur={() => formik.setFieldTouched("interviewMode", true)}
          value={formik.values.interviewMode}
          error={formik.errors.interviewMode}
          touched={formik.touched.interviewMode}
        />
        <FormSelect
          label="Interview Duration"
          placeholder="Select interview duration"
          name="interviewDuration"
          options={interviewDurationOptions}
          onChange={(fieldName: string, fieldValue: string) => {
            handleFieldChange(fieldName, fieldValue);
          }}
          onBlur={() => formik.setFieldTouched("interviewDuration", true)}
          value={formik.values.interviewDuration}
          error={formik.errors.interviewDuration}
          touched={formik.touched.interviewDuration}
        />
        <FormSelect
          label="Interview Language"
          placeholder="Select interview language"
          name="interviewLanguage"
          options={interviewLanguageOptions}
          onChange={(fieldName: string, fieldValue: string) => {
            handleFieldChange(fieldName, fieldValue);
          }}
          onBlur={() => formik.setFieldTouched("interviewLanguage", true)}
          value={formik.values.interviewLanguage}
          error={formik.errors.interviewLanguage}
          touched={formik.touched.interviewLanguage}
        />
        <Flex w="100%" justify="flex-end" mt="4rem" gap="20px">
          <Button colorScheme="gray" type="button" onClick={() => handleTab(1)}>
            Previous
          </Button>
          <Button colorScheme="red" type="submit">
            Submit
          </Button>
        </Flex>
      </Box>
    </Box>
  );
};

export default InterviewDetailsForm;
