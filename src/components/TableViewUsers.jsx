"use client";
import React, { useEffect, useState } from "react";
import DeleteIcon from "./Icons/DeleteIcon";
import UpdateIcon from "./Icons/UpdateIcon";
import AddIcon from "./Icons/AddIcon";
import NoteForm from "./NoteForm";
import AuthContext from "@/contexts/AuthContext";
import axios from "axios";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import ConfirmationDialog from "./Dialogs/ConfirmationDialog";
import Toast from "./Dialogs/Toast";

const TableViewUsers = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const { user } = useContext(AuthContext);
  const [notes, setNotes] = useState(null);
  const [openForm, setOpenForm] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState(null);
  const [idNoteToDelete, setidNoteToDelete] = useState(null);
  const [confirmDeleteNote, setConfirmDeleteNote] = useState(false);
  //the code the toast message part
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [isError, setIsError] = useState(false);

  const formatDateTime = (dateTimeString) => {
    const dateParts = dateTimeString.split(/[-T:Z]/); // Split the date string
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    const hour = dateParts[3];
    const minute = dateParts[4];

    // Construct the formatted date string
    const formattedDate = `${year}-${month}-${day} ${hour}:${minute}`;

    return formattedDate;
  };

  function handleUpdateNote(noteToUpdate) {
    console.log(noteToUpdate);
    setNoteToUpdate(noteToUpdate);
    setOpenForm(true);
  }

  function handleAddNote() {
    setNoteToUpdate(null);
    setOpenForm(true);
  }

  function fetchNotes() {
    // Retrieve the notes for the user
    axios
      .get(`${baseUrl}/api/notes/${user.id}`)
      .then((response) => {
        console.log(response);
        setNotes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching notes:", error);
      });
  }
  useEffect(() => {
    if (!user || !user?.admin) {
      //virify this later
      router.push("/auth");
      return;
    } else {
      fetchNotes();
    }
  }, [user]);

  const handleOpenModal = () => {
    document.getElementById("modelConfirm").style.display = "block";
    document.getElementsByTagName("body")[0].classList.add("overflow-y-hidden");
  };

  function handleDeleteNote(id) {
    console.log("handleDeleteNote function starts");
    // Display confirmation dialog before deleting
    // Here you can implement your confirmation dialog logic
    // For example:
    // setOpenConfirmationDialog(true); // Show confirmation dialog
    // When confirmed, proceed with deletion

    // Proceeding with deletion without confirmation dialog for now
    axios
      .delete(`${baseUrl}/api/notes/${id}`)
      .then((response) => {
        if (response.status === 204 || response.status === 200) {
          console.log("Note deleted successfully");
          setToastMsg("Note deleted successfully")
          setShowToast(true);

          // Fetch notes again after deletion
          fetchNotes();
        } else {
          console.error("Unexpected response while deleting note:", response);
        }
      })
      .catch((error) => {
        if (error.response) {
          // The request was made and the server responded with a status code
          console.error(
            "Error deleting note. Server responded with status code:",
            error.response.status
          );
        } else if (error.request) {
          // The request was made but no response was received
          console.error(
            "Error deleting note. No response received from server."
          );
        } else {
          // Something happened in setting up the request that triggered an error
          console.error("Error deleting note:", error.message);
        }
      });
  }

  function startHandleDeleteNote(note) {
    setidNoteToDelete(note.idNote);
    handleOpenModal();
  }

  useEffect(() => {
    console.log("the use effect is starting for delete note ...");
    if (confirmDeleteNote === true && idNoteToDelete != null) {
      console.log(confirmDeleteNote);
      console.log("not to delete is : " + idNoteToDelete);
      handleDeleteNote(idNoteToDelete);
    }
    setConfirmDeleteNote(false);
    setidNoteToDelete(null);
  }, [confirmDeleteNote]);

  return (
    <div>
      <ConfirmationDialog
        message={"Are you sure you want to delete this note?"}
        setConfirmDeleteNote={setConfirmDeleteNote}
      />
      <Toast
        setShowToast={setShowToast}
        showToast={showToast}
        toastMsg={toastMsg}
        isError={isError}
        setIsError={setIsError}
      />
      <div class="p-5 min-h-screen bg-gray-100">
        <div className="flex">
          <h1 class="text-xl mb-2">Your notes</h1>
          <div
            onClick={(e) => {
              handleAddNote();
            }}
          >
            <AddIcon />
          </div>
        </div>
        <NoteForm
          openForm={openForm}
          setOpenForm={setOpenForm}
          noteToUpdate={noteToUpdate}
          fetchNotes={fetchNotes}
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
                <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  Subject
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  Details
                </th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Date
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
              {notes?.map((note) => (
                <tr class="bg-white" key={note?.idNote}>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <a href="#" class="font-bold text-blue-500 hover:underline">
                      {note?.subject}
                    </a>
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {note?.body}
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {formatDateTime(note?.createdAt)}
                  </td>
                  <td class="p-3 text-sm  text-gray-700 whitespace-nowrap">
                    <div onClick={(e) => handleUpdateNote(note)}>
                      <UpdateIcon />
                    </div>
                  </td>
                  <td class="p-3 text-sm flex justify-center  text-gray-700 whitespace-nowrap">
                    <div
                      onClick={(e) => {
                        startHandleDeleteNote(note);
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
          {notes?.map((note) => (
            <div key={note?.idNote}>
              <div class="bg-white space-y-3 p-4 rounded-lg shadow">
                <div class="flex items-center space-x-2 text-sm">
                  <div>
                    <a href="#" class="text-blue-500 font-bold hover:underline">
                      {note?.subject}
                    </a>
                  </div>
                  <div class="text-gray-500">
                    {formatDateTime(note?.createdAt)}
                  </div>
                  <div onClick={(e) => handleUpdateNote(note)}>
                    <UpdateIcon />
                  </div>
                </div>
                <div class="text-sm text-gray-700">{note?.body}</div>
                <div class="text-sm font-medium text-black">
                <div
                      onClick={(e) => {
                        startHandleDeleteNote(note);
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
