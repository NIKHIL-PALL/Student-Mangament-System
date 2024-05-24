import React, { useEffect } from "react";
import { isAge, isGrade, isName } from "../Utils/validation";
import { useState } from "react";

const StudentForm2 = ({
  formState,
  setFormState,
  enteredValues,
  setEnteredValues,

  isEdit,
  setIsEdit,
  isEditItem,

  indianStates,
  setInputs,
  progress,
  setProgress,
}) => {
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [isValid, setIsValid] = useState(true);
  const [success, setSuccess] = useState(false);
  const handleCancel = () => {
    setFormState({
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
      degree: "",
      subjects: [],
    });
    setProgress(0);
    setInputs({
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
      degree: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs((prevInputs) => {
      const updatedInputs = { ...prevInputs, [name]: value };

      const filledInputs = Object.values(updatedInputs).filter(
        (input) => input !== ""
      ).length;

      const totalInputs = Object.keys(updatedInputs).length;

      const newProgress = (filledInputs / totalInputs) * 100;
      setProgress(newProgress);

      return updatedInputs;
    });
  };
  const handlecheckboxchange = (event) => {
    const { id, checked } = event.target;
    // handleInputChange(event);
    if (checked) {
      setFormState((prevState) => ({
        ...prevState,
        subjects: [...prevState.subjects, id],
      }));
    } else {
      setFormState((prevState) => ({
        ...prevState,
        subjects: prevState.subjects.filter((item) => item !== id),
      }));
    }
  };

  function handleOnFormSubmit(event) {
    event.preventDefault();
    if (
      !(
        isAge(formState.age) &&
        isName(formState.name) &&
        isGrade(formState.grade)
      )
    ) {
      setIsValid(false);
      return;
    }
    setIsValid(true);
    setIsEdit(false);
    if (isEdit) {
      setSuccess(true);
      setUpdateSuccess(true);
      setEnteredValues((prevValues) => {
        return prevValues.map((prev) => {
          if (prev.id === isEditItem) {
            return {
              id: prev.id,
              name: formState.name,
              age: formState.age,
              grade: formState.grade,
              gender: formState.gender,
              email: formState.email,
              dob: formState.dob,
              state: formState.state,
              pincode: formState.pincode,
              degree: formState.degree,
              address: formState.address,
              addressLine2: formState.address2,
              subjects: formState.subjects,
              mobileNumber: formState.mobileNumber,
            };
          }
          return prev;
        });
      });
    } else {
      setSuccess(true);
      setEnteredValues((prevValues) => {
        return [
          ...prevValues,
          {
            id: new Date().getTime().toString(),
            name: formState.name,
            age: formState.age,
            grade: formState.grade,
            gender: formState.gender,
            email: formState.email,
            dob: formState.dob,
            state: formState.state,
            pincode: formState.pincode,
            degree: formState.degree,
            address: formState.address,
            addressLine2: formState.address2,
            subjects: formState.subjects,
            mobileNumber: formState.mobileNumber,
          },
        ];
      });
    }
  }
  useEffect(() => {
    localStorage.setItem("Students", JSON.stringify(enteredValues));
  }, [enteredValues]);

  useEffect(() => {
    if (success) {
      const resetForm = () => {
        setFormState({
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
          degree: "",
          subjects: [],
        });
        setProgress(0);
        setInputs({
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
          degree: "",
        });
      };

      resetForm();

      setTimeout(() => {
        setSuccess(false);
        setUpdateSuccess(false);
      }, 2000);
    }
  }, [success, setFormState, setProgress, setInputs]);

  return (
    <React.Fragment>
      <div className="container mt-5">
        <label htmlFor="progressBar" className="form-label">
          Form Completion :{" "}
        </label>
        <progress
          className="progress-custom"
          value={progress}
          max="100"
        ></progress>
      </div>

      <div className="form-control m-5 d-flex justify-content-center align-items-center flex-column">
        {!isValid && (
          <div
            className="alert alert-warning alert-dismissible fade show"
            role="alert"
          >
            <strong>Incorrect inputs!</strong> You should check in on some of
            those fields below.
          </div>
        )}
        {success && (
          <div className="alert alert-success" role="alert">
            {updateSuccess
              ? "Successfully updated."
              : "Successfully added student to list"}
          </div>
        )}

        <form action="" onSubmit={(e) => handleOnFormSubmit(e)}>
          <div className="mb-3  ">
            <label className="form-label" htmlFor="name">
              Name <span className="text-danger">*</span> :
            </label>
            <input
              className="form-control"
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              onChange={(e) => {
                handleInputChange(e);
                return setFormState((prevState) => ({
                  ...prevState,
                  name: e.target.value,
                }));
              }}
              value={formState.name}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="age" className="form-label">
              Age <span className="text-danger">*</span> :
            </label>
            <input
              type="number"
              name="age"
              id="age"
              placeholder="Enter your age"
              onChange={(e) => {
                handleInputChange(e);
                return setFormState((prevState) => ({
                  ...prevState,
                  age: e.target.value,
                }));
              }}
              value={formState.age}
              required
              className="form-control"
            />
          </div>
          <label>
            Gender <span className="text-danger">*</span> :{" "}
          </label>
          <div className="d-inline">
            <input
              type="radio"
              name="gender"
              id="male"
              value="M"
              required
              onChange={(e) => {
                handleInputChange(e);
                return setFormState((prevState) => ({
                  ...prevState,
                  gender: e.target.value,
                }));
              }}
              checked={formState.gender === "M"}
            />
            <label htmlFor="male" className="form-label mx-2 ">
              Male
            </label>
          </div>
          <div className="d-inline ">
            <input
              type="radio"
              name="gender"
              id="female"
              value="F"
              required
              onChange={(e) => {
                handleInputChange(e);
                return setFormState((prevState) => ({
                  ...prevState,
                  gender: e.target.value,
                }));
              }}
              checked={formState.gender === "F"}
            />
            <label htmlFor="female" className="form-label mx-2">
              Female
            </label>
          </div>
          <div className="mb-3">
            <label htmlFor="">
              Date of Birth <span className="text-danger">*</span> :
            </label>
            <input
              type="date"
              value={formState.dob}
              required
              name="dob"
              onChange={(e) => {
                handleInputChange(e);
                return setFormState((prevState) => ({
                  ...prevState,
                  dob: e.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="grade" className="form-label">
              Grade : <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              id="grade"
              name="grade"
              onChange={(e) => {
                handleInputChange(e);
                return setFormState((prevState) => ({
                  ...prevState,
                  grade: e.target.value.toUpperCase(),
                }));
              }}
              value={formState.grade}
              required
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>
              Email <span className="text-danger">*</span> :{" "}
            </label>
            <input
              type=""
              className="form-control"
              id="email"
              name="email"
              value={formState.email}
              onChange={(e) => {
                handleInputChange(e);
                return setFormState((prevState) => ({
                  ...prevState,
                  email: e.target.value,
                }));
              }}
              required
            />
            <br />
            <br />
          </div>
          <div className="mb-3">
            <label>
              Mobile Number <span className="text-danger">*</span>:
            </label>
            <input
              className="form-control"
              id="mobileNumber"
              type="number"
              value={formState.mobileNumber}
              name="mobileNumber"
              pattern="\+\d{2}\s\d{10}"
              placeholder="+91XXXXXXXXXX"
              onChange={(e) => {
                handleInputChange(e);
                return setFormState((prevState) => ({
                  ...prevState,
                  mobileNumber: e.target.value,
                }));
              }}
              required
            />
            <br />
            <br />
          </div>
          <div className="mb-3">
            <label htmlFor="">
              Choose Degree <span className="text-danger">*</span>
            </label>
            <input
              type="text"
              list="courses"
              name="degree"
              required
              value={formState.degree}
              onChange={(e) => {
                handleInputChange(e);
                return setFormState((prevState) => ({
                  ...prevState,
                  degree: e.target.value,
                }));
              }}
            />
            <datalist id="courses">
              <option value="Bachelor of Technology">
                Bachelor of Technology
              </option>
              <option value=" Bachelor of Engineering (B.E)">
                {" "}
                Bachelor of Engineering (B.E)
              </option>
              <option value="Bachelor of Science (B.Sc)">
                Bachelor of Science (B.Sc)
              </option>
              <option value="Bachelor of Arts (B.A)">
                Bachelor of Arts (B.A)
              </option>
              <option value="Bachelor of Commerce (B.Com)">
                Bachelor of Commerce (B.Com)
              </option>
              <option value="Bachelor of Business Administration (BBA)">
                Bachelor of Business Administration (BBA)
              </option>
              <option value="Bachelor of Computer Applications (BCA)">
                Bachelor of Computer Applications (BCA)
              </option>
              <option value="Bachelor of Pharmacy (B.Pharm)">
                Bachelor of Pharmacy (B.Pharm)
              </option>
            </datalist>
          </div>

          <div className="mb-3">
            <label>Choose Any Language : </label>
            <span className="mx-4">
              <input
                className="mx-2"
                type="checkbox"
                id="C"
                name="subjects"
                checked={formState.subjects.includes("C")}
                onChange={(e) => handlecheckboxchange(e)}
              />
              C
              <input
                className="mx-2"
                type="checkbox"
                name="subjects"
                id="Python"
                checked={formState.subjects.includes("Python")}
                onChange={(e) => handlecheckboxchange(e)}
              />
              Python
              <input
                type="checkbox"
                className="mx-2"
                name="subjects"
                id="Java"
                checked={formState.subjects.includes("Java")}
                onChange={(e) => handlecheckboxchange(e)}
              />
              Java
            </span>
            <br />
          </div>
          <div className="mb-3">
            <label>
              State <span className="text-danger">*</span> :{" "}
            </label>
            <select
              className="form-control"
              value={formState.state}
              name="state"
              onChange={(e) => {
                handleInputChange(e);
                return setFormState((prevState) => ({
                  ...prevState,
                  state: e.target.value,
                }));
              }}
            >
              <option value="" disabled>
                Select State
              </option>
              {indianStates.map((state, index) => (
                <option value={state} key={index}>
                  {state}
                </option>
              ))}
            </select>
          </div>
          <br />
          <div className="mb-3">
            <label>
              Address <span className="text-danger">*</span> :
            </label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              value={formState.address}
              onChange={(e) => {
                handleInputChange(e);
                return setFormState((prevState) => ({
                  ...prevState,
                  address: e.target.value,
                }));
              }}
              required
            />
            <br />
          </div>
          <div className="mb-3">
            <label htmlFor="">Address Line 2 :</label>
            <textarea
              className="form-control"
              id="address2"
              value={formState.address2}
              onChange={(e) =>
                setFormState((prevState) => ({
                  ...prevState,
                  address2: e.target.value,
                }))
              }
            />
            <br />
          </div>
          <div className="mb-3">
            <label>
              Pincode <span className="text-danger">*</span> :{" "}
            </label>
            <input
              className="form-control"
              type="number"
              id="pincode"
              value={formState.pincode}
              name="pincode"
              required
              onChange={(e) => {
                handleInputChange(e);
                return setFormState((prevState) => ({
                  ...prevState,
                  pincode: e.target.value,
                }));
              }}
            />
          </div>

          <div className="d-flex mt-3">
            <input
              className="btn btn-primary me-md-2 mb-3"
              type="submit"
              value={isEdit ? "Update" : "Add"}
            />
            <button
              className="btn btn-danger me-md-2 mb-3"
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default StudentForm2;
