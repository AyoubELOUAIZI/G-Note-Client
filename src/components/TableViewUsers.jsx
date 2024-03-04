"use client";
import React, { useEffect, useState } from "react";
import DeleteIcon from "./Icons/DeleteIcon";
import UpdateIcon from "./Icons/UpdateIcon";
import VerifiedUserIcon from "./Icons/VerifiedUserIcon";
import UserForm from "./UserForm";
import AuthContext from "@/contexts/AuthContext";
import axios from "axios";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "./Dialogs/ConfirmationDialog";
import Toast from "./Dialogs/Toast";
import AddUserIcon from "./Icons/AddUserIcon";
import UnverifiedUser from "./Icons/UnverifiedUser";

const TableViewUsers = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  //!this state is for the currect authenticated user witch is the admin in this case
  const { user } = useContext(AuthContext);
  //!the user means the user from the list of users in the table
  const [Users, setUsers] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [UserToUpdate, setUserToUpdate] = useState(null);
  const [idUserToDelete, setidUserToDelete] = useState(null);
  const [confirmDeleteUser, setConfirmDelete] = useState(false);
  //the code the toast message part
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const formatDateTime = (dateTimeString) => {
    const dateParts = dateTimeString.split(/[-T:Z]/); // Split the date string
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const hour = dateParts[3]; //why the hour is send from the backend with -1 maybe serialization
    const minute = dateParts[4];

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;

    return formattedDate;
  };

  function handleUpdateUser(UserToUpdate) {
    console.log(UserToUpdate);
    setUserToUpdate(UserToUpdate);
    setOpenForm(true);
  }

  function handleAddUser() {
    setUserToUpdate(null);
    setOpenForm(true);
  }

  function fetchAllUsers() {
    // Retrieve the Users for the user
    axios
      .get(`${baseUrl}/api/users`)
      .then((response) => {
        console.log(response);
        setUsers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching Users:", error);
      });
  }
  useEffect(() => {
    if (!user || !user?.admin) {
      //virify this later
      router.push("/auth");
      return;
    } else {
      fetchAllUsers();
    }
  }, [user]);

  const handleOpenModal = () => {
    document.getElementById("modelConfirm").style.display = "block";
    document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
  };

  function handleDeleteUser(id) {
    console.log("handleDeleteUser function starts");
    // Display confirmation dialog before deleting
    // Here you can implement your confirmation dialog logic
    // For example:
    // setOpenConfirmationDialog(true); // Show confirmation dialog
    // When confirmed, proceed with deletion

    // Proceeding with deletion without confirmation dialog for now
    axios
      .delete(`${baseUrl}/api/users/${id}`)
      .then((response) => {
        if (response.status === 204 || response.status === 200) {
          console.log("User deleted successfully");
          setToastMsg("User deleted successfully");
          setShowToast(true);

          // Fetch Users again after deletion
          fetchAllUsers();
        } else {
          console.error("Unexpected response while deleting User:", response);
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error(
            "Error deleting User. Server responded with status code:",
            error.response.status
          );
        } else if (error.request) {
          // The request was made but no response was received
          console.error(
            "Error deleting User. No response received from server."
          );
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error deleting User:", error.message);
        }
      });
  }

  function startHandleDeleteUser(User) {
    setidUserToDelete(User.id);
    handleOpenModal();
  }

  useEffect(() => {
    console.log("the use effect is starting for delete User ...");
    if (confirmDeleteUser === true && idUserToDelete != null) {
      console.log(confirmDeleteUser);
      console.log("not to delete is : " + idUserToDelete);
      handleDeleteUser(idUserToDelete);
    }
    setConfirmDelete(false);
    setidUserToDelete(null);
  }, [confirmDeleteUser]);

  return (
    <div>
      <ConfirmationDialog
        message={"Are you sure you want to delete this user?"}
        setConfirmDelete={setConfirmDelete}
      />
      <Toast
        setShowToast={setShowToast}
        showToast={showToast}
        toastMsg={toastMsg}
        isError={isError}
        setIsError={setIsError}
      />
      <div class="p-5 min-h-screen bg-gray-100">
        <div className="flex items-end justify-between">
          <h1 class="text-xl mb-2">List users</h1>
          <div className="border-slate-500 border m-1"
            onClick={(e) => {
              handleAddUser();
            }}
          >
            <AddUserIcon />
          </div>
        </div>
        <UserForm
          openForm={openForm}
          setOpenForm={setOpenForm}
          UserToUpdate={UserToUpdate}
          fetchAllUsers={fetchAllUsers}
          userId={user?.id}
          // for toast
          setShowToast={setShowToast}
          showToast={showToast}
          toastMsg={toastMsg}
          setToastMsg={setToastMsg}
          isError={isError}
          setIsError={setIsError}
        />
        {/* for large screen we use this */}
        <div class="overflow-auto rounded-lg shadow hidden md:block">
          <table class="w-full">
            <thead class="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Full name
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  Email
                </th>
                <th class="w-24 p-3  text-sm font-semibold tracking-wide text-center">
                  Role
                </th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                Verified
                </th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Created At
                </th>
                <th class="w-16 p-3 text-sm font-semibold tracking-wide text-left">
                  Edit
                </th>
                <th class="w-16 p-3 text-sm font-semibold tracking-wide text-left">
                  Delete
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {Users?.map((user) => (
                <tr class="bg-white" key={user?.id}>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <a href="#" class="font-bold text-blue-500 hover:underline">
                      {user?.fullName}
                    </a>
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user?.email}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user?.admin ? (
                      <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                        Admin
                      </span>
                    ) : (
                      <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-orange-800 bg-orange-200 rounded-lg bg-opacity-50">
                        client
                      </span>
                    )}
                  </td>
                  <td class="p-3 text-sm text-gray-700  whitespace-nowrap">
                    {/* <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50"> */}
                    {user?.subscribed ? (
                      <VerifiedUserIcon />
                    ) : (
                      <UnverifiedUser />
                    )}
                    {/* </span> */}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {formatDateTime(user?.createdAt)}
                  </td>
                  <td class="p-3 text-sm  text-gray-700 whitespace-nowrap">
                    <div onClick={(e) => handleUpdateUser(user)}>
                      <UpdateIcon />
                    </div>
                  </td>
                  <td class="p-3 text-sm flex justify-center  text-gray-700 whitespace-nowrap">
                    <div
                      onClick={(e) => {
                        startHandleDeleteUser(user);
                      }}
                    >
                      <DeleteIcon />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* for the midiam screen we use this  */}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {Users?.map((user) => (
            <div key={user?.id}>
              <div class="bg-white space-y-3 p-4 rounded-lg shadow">
                <div class="flex items-center space-x-2 text-sm">
                  <div>
                    <a href="#" class="text-blue-500 font-bold hover:underline">
                      {user?.fullName}
                    </a>
                  </div>
                  <div class="text-gray-500">
                    {formatDateTime(user?.createdAt)}
                  </div>
                  <div onClick={(e) => handleUpdateUser(user)}>
                    <UpdateIcon />
                  </div>
                </div>
                <div class="text-sm text-gray-700 flex">
                  {user?.email}
                  {user?.admin ? (
                      <span class="p-1.5 ml-1 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                        Admin
                      </span>
                    ) : (
                      <span class="p-1.5 ml-1 text-xs font-medium uppercase tracking-wider text-orange-800 bg-orange-200 rounded-lg bg-opacity-50">
                        client
                      </span>
                    )}
                  {user?.subscribed ? <VerifiedUserIcon /> : <UnverifiedUser />}
                </div>
                <div class="text-sm font-medium text-black">
                  <div
                    onClick={(e) => {
                      startHandleDeleteUser(user);
                    }}
                  >
                    <DeleteIcon />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableViewUsers;
