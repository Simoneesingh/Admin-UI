import { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import "./MembersTable.css";
import Pagination from "./Pagination";
import DeleteSelected from "./DeleteSelected";
import CheckIcon from "@mui/icons-material/Check";

const MembersTable = () => {
  const [membersData, setMembersData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectAllChecked, setSelectAllChecked] = useState("");
  const [editingRowId, setEditingRowId] = useState(null);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  const fetchMembers = async () => {
    try {
      const response = await axios.get(
        "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
      );
      if (response.length === 0) {
        setError("No data found");
      } else {
        setMembersData(response.data);
      }
    } catch (error) {
      setError("Error fetching user data" + error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []); // App.js

  const filteredData = membersData.filter((row) =>
    Object.values(row).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const handleSearch = (event) => {
    setCurrentPage(1);
    setSearchQuery(event.target.value);
  };

  const handleRowCheck = (rowId) => {
    if (selectedRows.includes(rowId)) {
      setSelectedRows(selectedRows.filter((id) => id !== rowId));
    } else {
      setSelectedRows([...selectedRows, rowId]);
    }
  };

  const CheckAllTheRows = () => {
    if (selectAllChecked.length === visibleMembers.length) {
      setSelectAllChecked([]);
      setSelectedRows([]);
    } else {
      const allRowIds = visibleMembers.map((row) => row.id);
      setSelectAllChecked(allRowIds);
      setSelectedRows(allRowIds);
    }
  };

  const deleteOneRow = (rowId) => {
    const updatedMembersData = membersData.filter((row) => row.id !== rowId);
    setMembersData(updatedMembersData);
  };

  const handleEdit = (id) => {
    setEditingRowId(id);
  };

  const handleEditInputChange = (id, fieldName, value) => {
    const updatedMemberData = membersData.map((row) =>
      row.id === id ? { ...row, [fieldName]: value } : row
    );
    setMembersData(updatedMemberData);
  };

  const handleDeleteSelected = () => {
    const updatedMembersData = membersData.filter(
      (row) => !selectedRows.includes(row.id)
    );
    setMembersData(updatedMembersData);
    setSelectedRows([]);
    setSelectAllChecked([]);
  };

  const handleSaveEdit = (id) => {
    setEditingRowId(null);

    const editedRow = membersData.find((row) => row.id === id);

    const updatedMemberData = membersData.map((row) =>
      row.id === id ? editedRow : row
    );

    setMembersData(updatedMemberData);
  };

  const totalPages = Math.ceil(membersData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleMembers = filteredData.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      {" "}
      {error ? (
        <h1>{error}</h1>
      ) : (
        <>
          <SearchBar searchQuery={searchQuery} handleSearch={handleSearch} />
          <table>
            <thead>
              <tr>
                <th>
                  <input
                    checked={selectAllChecked.length === visibleMembers.length}
                    type="checkbox"
                    onChange={CheckAllTheRows}
                  />
                </th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {visibleMembers.map((member) => (
                <tr
                  className={
                    selectedRows.includes(member.id) ? "isSelected" : null
                  }
                  key={member.id}
                >
                  <td>
                    <input
                      checked={selectedRows.includes(member.id)}
                      type="checkbox"
                      onChange={() => handleRowCheck(member.id)}
                    />
                  </td>
                  <td>
                    {editingRowId === member.id ? (
                      <input
                        type="text"
                        value={member.name}
                        onChange={(e) =>
                          handleEditInputChange(
                            member.id,
                            "name",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      member.name
                    )}
                  </td>
                  <td>
                    {editingRowId === member.id ? (
                      <input
                        type="email"
                        value={member.email}
                        onChange={(e) =>
                          handleEditInputChange(
                            member.id,
                            "email",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      member.email
                    )}
                  </td>
                  <td>
                    {editingRowId === member.id ? (
                      <input
                        type="text"
                        value={member.role}
                        onChange={(e) =>
                          handleEditInputChange(
                            member.id,
                            "role",
                            e.target.value
                          )
                        }
                      />
                    ) : (
                      // Display the role
                      member.role
                    )}
                  </td>
                  <td className="btn-container">
                    {editingRowId === member.id ? (
                      <button
                        className="action-btn save"
                        onClick={() => handleSaveEdit(member.id)}
                      >
                        <CheckIcon />
                      </button>
                    ) : (
                      <button
                        className="action-btn edit"
                        onClick={() => handleEdit(member.id)}
                      >
                        <EditIcon />
                      </button>
                    )}
                    <button
                      className="action-btn delete"
                      value={member.id}
                      onClick={(e) => deleteOneRow(member.id)}
                    >
                      <DeleteIcon />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="footer">
            <DeleteSelected handleDeleteSelected={handleDeleteSelected} />
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </>
  );
};

export default MembersTable;
