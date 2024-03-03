"use client";
import React, { useEffect, useState } from "react";

const TableView = () => {
  const [notes, setNotes] = useState(null);
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
        <h1 class="text-xl mb-2">Your orders</h1>
        {/* for large screen we use this */}
        <div class="overflow-auto rounded-lg shadow hidden md:block">
          <table class="w-full">
            <thead class="bg-gray-50 border-b-2 border-gray-200">
              <tr>
                <th class="w-20 p-3 text-sm font-semibold tracking-wide text-left">
                  No.
                </th>
                <th class="p-3 text-sm font-semibold tracking-wide text-left">
                  Details
                </th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Status
                </th>
                <th class="w-24 p-3 text-sm font-semibold tracking-wide text-left">
                  Date
                </th>
                <th class="w-32 p-3 text-sm font-semibold tracking-wide text-left">
                  Total
                </th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              {notes?.map((note) => (
                <tr class="bg-white" key={note.id}>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <a href="#" class="font-bold text-blue-500 hover:underline">
                      10001
                    </a>
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    Kring New Fit office chair, mesh + PU, black
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                      Delivered
                    </span>
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    16/10/2021
                  </td>
                  <td class="p-3 text-sm text-gray-700 whitespace-nowrap">
                    $200.00
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
                      #1000
                    </a>
                  </div>
                  <div class="text-gray-500">10/10/2021</div>
                  <div>
                    <span class="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                      Delivered
                    </span>
                  </div>
                </div>
                <div class="text-sm text-gray-700">
                  Kring New Fit office chair, mesh + PU, black
                </div>
                <div class="text-sm font-medium text-black">$200.00</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableView;
