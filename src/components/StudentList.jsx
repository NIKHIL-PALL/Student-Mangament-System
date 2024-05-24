import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import ConfirmationDailog from "../Utils/ConfirmationDailog";

function StudentList({
  studentList,
  setItems,
  setIsEdit,
  setIsEditItem,
  setInputs,
  setProgress,
  progress,
  setFormState,
  formState,
}) {
  const [showDailog, setShowDailog] = useState(false);
  const [currentId, setCurrentId] = useState();
  const handleOnDelete = (id) => {
    setShowDailog(true);
    setCurrentId(id);
  };
  const handleDelete = () => {
    setShowDailog(false);
    setItems((items) =>
      items.filter((item) => {
        return item.id !== currentId;
      })
    );
  };
  const handleCancel = () => {
    setShowDailog(false);
  };
  const handleEdit = (id) => {
    const student = studentList.find((student) => student.id === id);
    setIsEdit(true);

    setFormState({
      name: student.name,
      age: student.age,
      grade: student.grade,
      gender: student.gender,
      email: student.email,
      dob: student.dob,
      mobileNumber: student.mobileNumber,
      pincode: student.pincode,
      state: student.state,
      subjects: student.subjects,
      address: student.address,
      address2: student.address2,
      degree: student.degree,
    });

    setIsEditItem(id);

    setInputs({
      name: student.name,
      age: student.age,
      grade: student.grade,
      gender: student.gender,
      email: student.email,
      dob: student.dob,
      mobileNumber: student.mobileNumber,
      pincode: student.pincode,
      state: student.state,
      address: student.address,
      degree: student.degree,
    });
    setProgress(100);
  };
  return (
    <React.Fragment>
      {showDailog && (
        <ConfirmationDailog
          show
          onConfirm={handleDelete}
          onCancel={handleCancel}
        ></ConfirmationDailog>
      )}
      <div className={`container mt-5 `}>
        <h2>Student data</h2>
        {!studentList.length ? (
          <h2>No Data</h2>
        ) : (
          <>
            <table className="table table-striped table-bordered table-hover">
              <thead className="thead-dark mb-4">
                <tr className="table-primary">
                  <th>Id</th>
                  <th>Name</th>
                  <th>Age</th>
                  <th>DOB</th>
                  <th>Gender</th>
                  <th>Grade</th>
                  <th>Email</th>
                  <th>mobile</th>
                  <th>State</th>
                  <th>Address</th>
                  <th>Pincode</th>
                  <th>Degree</th>
                  <th>Languages</th>

                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {studentList.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>{student.name}</td>
                    <td>{student.age}</td>
                    <td>{student.dob}</td>
                    <td>{student.gender}</td>
                    <td>{student.grade}</td>
                    <td>{student.email}</td>
                    <td>{student.mobileNumber}</td>
                    <td>{student.state}</td>
                    <td>{student.address}</td>
                    <td>{student.pincode}</td>
                    <td>{student.degree}</td>
                    <td>
                      {student.subjects &&
                        student.subjects.map((subject, ind) => (
                          <span key={ind}>{subject} </span>
                        ))}
                    </td>
                    <td>
                      <div className="d-flex justify-content-around">
                        <FontAwesomeIcon
                          icon={faPenToSquare}
                          onClick={() => handleEdit(student.id)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => handleOnDelete(student.id)}
                        ></FontAwesomeIcon>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
    </React.Fragment>
  );
}

export default StudentList;
