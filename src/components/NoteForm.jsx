import React, { useState } from "react";
import CloseIcon from "./Icons/CloseIcon";

const NoteForm = ({openForm, setOpenForm}) => {
  return (
    <div>
    { openForm && <form class="max-w-sm mx-auto  pb-5 ">
        <div class="mb-5">
          <label
            for="jubject"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your note subject
          </label>
          <input
            type="text"
            id="jubject"
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="my note subject ..."
            required
          />
        </div>
        <div class="mb-5">
          <label
            for="body"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your note body
          </label>
          <textarea
            id="body"
            rows="4"
            class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Leave a comment..."
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="submit"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
          <div onClick={(e) => setOpenForm(false)}>
            <CloseIcon />
          </div>
        </div>
      </form>}
    </div>
  );
};

export default NoteForm;