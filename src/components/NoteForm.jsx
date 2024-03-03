import React, { useEffect, useState } from "react";
import axios from "axios";
import CloseIcon from "./Icons/CloseIcon";

const NoteForm = ({ openForm, setOpenForm, noteToUpdate,fetchNotes }) => {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    // Update subject and body state when noteToUpdate changes
    if (noteToUpdate) {
      setSubject(noteToUpdate.subject);
      setBody(noteToUpdate.body);
    } else {
      // Reset subject and body when noteToUpdate is null (for adding new note)
      setSubject("");
      setBody("");
    }
  }, [noteToUpdate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const noteData = {idNote:noteToUpdate?noteToUpdate.idNote: null, subject: subject, body: body };

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
      console.log("🚀 ~ handleSubmit ~ baseUrl:", baseUrl);
      if (!baseUrl) {
        console.error("Base URL not defined in .env file");
        return;
      }
      let res;
      if (noteToUpdate) {
        res = await axios.put(`${baseUrl}/api/notes`, noteData);
      } else {
        res = await axios.post(`${baseUrl}/api/notes`, noteData);
      }
      console.log('res')
      console.log(res)
      // Check response status to determine success or failure
      if (res.status === 200) {
        fetchNotes();
        console.log("Request successful:", res.data);
      } else {
        console.error("Request failed:", res.statusText);
      }

      setOpenForm(false); // Close form after successful submission
    } catch (error) {
      console.error("Error:", error);
      // Handle error if necessary
    }
  };

  return (
    <div>
      {openForm && (
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto pb-5">
          <div className="mb-5">
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your note subject
            </label>
            <input
              type="text"
              id="subject"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter note subject..."
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="body"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Your note body
            </label>
            <textarea
              id="body"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter note body..."
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
            ></textarea>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {noteToUpdate ? "Update" : "Submit"}
            </button>
            <div onClick={(e) => setOpenForm(false)}>
              <CloseIcon />
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default NoteForm;
