"use client";
import React, { useEffect, useState } from "react";
import DeleteIcon from "./Icons/DeleteIcon";
import UpdateIcon from "./Icons/UpdateIcon";
import AddIcon from "./Icons/AddIcon";
import NoteForm from "./NoteForm";

const TableView = () => {
  const [notes, setNotes] = useState(null);
  const [openForm, setOpenForm] = useState(false);

  //   setNotes([{}, {}, {}]);
  useEffect(() => {
    setNotes([
      { id: 1, content: "Note 1" },
      { id: 2, content: "Note 2" },
      { id: 4, content: "Note 3" },
      { id: 5, content: "Note 3" },
      { id: 6, content: "Note 3" },
      { id: 7, content: "Note 3" },
    ]);
  }, []);

  return (
    <div>
      <div class="p-5 h-screen bg-gray-100">
        <div className="flex">
          <h1 class="text-xl mb-2">Your notes</h1>
          <div onClick={e=>setOpenForm(true)}>
          <AddIcon />
          </div>
        </div>
        <NoteForm openForm={openForm} setOpenForm={setOpenForm}/>
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
                <tr class="bg-white" key={note.id}>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <a href="#" class="font-bold text-blue-500 hover:underline">
                      Physics Homework
                    </a>
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    Reminder to complete...
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    16/10/2021
                  </td>
                  <td class="p-3 text-sm  text-gray-700 whitespace-nowrap">
                  <div onClick={e=>setOpenForm(true)}>
                    <UpdateIcon />
                    </div>
                  </td>
                  <td class="p-3 text-sm flex justify-center  text-gray-700 whitespace-nowrap">
                    <DeleteIcon />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* for the midiam screen we use this  */}
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
          {notes?.map((note) => (
            <div key={note.id}>
              <div class="bg-white space-y-3 p-4 rounded-lg shadow">
                <div class="flex items-center space-x-2 text-sm">
                  <div>
                    <a href="#" class="text-blue-500 font-bold hover:underline">
                      Physics Homework
                    </a>
                  </div>
                  <div class="text-gray-500">10/10/2021</div>
                  <div>
                    <UpdateIcon />
                  </div>
                </div>
                <div class="text-sm text-gray-700">
                  Kring New Fit office chair, mesh + PU, black
                </div>
                <div class="text-sm font-medium text-black">
                  <DeleteIcon />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableView;
