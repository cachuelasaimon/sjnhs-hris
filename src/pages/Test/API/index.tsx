import React from 'react';
// import { useSnackbar } from "notistack";

// ? Form & UI
// import { Button } from "@mui/material";
// import { Formik, Form, Field, FormikHelpers } from "formik";
// import { TextField } from "formik-mui";

// ? Firebase Modules
import { UserWrapper } from '~/components';

// ? Redux
// import { useDispatch } from "react-redux";
// import { testAction } from "utils/redux";

const APITest: React.FC = () => {
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const dispatch = useDispatch();

  // const { docs } = useListen({ collectionRef: collections.products.ref });
  // React.useEffect(() => {}, [docs]);

  // ? Submit case
  // const testAdd = async (values: any, { resetForm }: FormikHelpers<any>) => {
  //   try {
  //     await Set({
  //       docRef: doc(collections.users.ref, "K3z4QCFHC3iSjCEMUYjZ"),
  //       data: values,
  //     });
  //     resetForm();
  //     enqueueSnackbar("User Added", { variant: "success" });
  //   } catch (err) {
  //     enqueueSnackbar("Something went wrong", { variant: "error" });
  //   }
  // };

  return (
    <>
      <UserWrapper />
      {/* Form Case (add validationSchema) */}
      {/* <Formik
        initialValues={{
          name: "",
          contactNo: "",
          email: "",
          cartId: "Fy6zQtVWbDlXSXktfhHA",
          orders: ["cbVV4WYL30OJVRrQDPk0"],
          roles: ["admin"],
        }}
        onSubmit={testAdd}
      >
        {(props) => (
          <Form>
            <Field name="name" label="Name" component={TextField} />
            <Field name="email" label="Email" component={TextField} />
            <Field name="contactNo" label="Contact No." component={TextField} />

            <Button type="submit" variant="contained">
              Test Add
            </Button>
          </Form>
        )}
      </Formik> */}

      {/* Map Case */}
    </>
  );
};

export default APITest;
