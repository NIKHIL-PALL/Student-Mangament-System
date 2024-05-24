import StudentForm from "../StudentForm";
import StudentList from "../StudentList";
import React, { useState } from "react";

const getItems = () => {
  let students = localStorage.getItem("Students");
  if (students) {
    return JSON.parse(students);
  } else {
    return [];
  }
};

const Dashboard = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [isEditItem, setIsEditItem] = useState(null);

  const [formState, setFormState] = useState({
    name: "",
    age: "",
    grade: "",
    gender: "",

    email: "",
    dob: "",
    mobileNumber: "",
    pincode: "",
    state: "",
    address: "",
    address2: "",
    degree: "",
    subjects : "",
  });
  const [students, setStudents] = useState(getItems());

  const [inputs, setInputs] = useState({
    name: "",
    age: "",
    grade: "",
    gender: "",
    email: "",
    dob: "",
    mobileNumber: "",
    state: "",
    address : "",
    degree : "",
  });
  const [progress, setProgress] = useState(0);

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  return (
    <React.Fragment>
      <div>
        <StudentForm
          formState={formState}
          setFormState={setFormState}
          enteredValues={students}
          setEnteredValues={setStudents}
          isEdit={isEdit}
          setIsEdit={setIsEdit}
          isEditItem={isEditItem}
          indianStates={indianStates}
          inputs={inputs}
          setInputs={setInputs}
          progress={progress}
          setProgress={setProgress}
        />
        <StudentList
          studentList={students}
          setItems={setStudents}
          setIsEdit={setIsEdit}
          setIsEditItem={setIsEditItem}
          setInputs={setInputs}
          progress={progress}
          setFormState={setFormState}
          formState = {formState}
          setProgress={setProgress}
        />
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
