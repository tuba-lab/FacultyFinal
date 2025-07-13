import React, { useState, useEffect } from "react";

const FacultyProfile = () => {
  const [profilePhoto, setProfilePhoto] = useState(
    () => localStorage.getItem("facultyPhoto") || null
  );
  const [name, setName] = useState(
    () => localStorage.getItem("facultyName") || "Prof. Arman Rasool Faridi"
  );
  const [qualification, setQualification] = useState(
    () =>
      localStorage.getItem("facultyQualification") ||
      "Ph.D. (Computer Sc.) and MCA"
  );
  const [email, setEmail] = useState(
    () =>
      localStorage.getItem("facultyEmail") ||
      "arman.faridi@gmail.com , ar.faridi.cs@amu.ac.in"
  );
  const [studentSections, setStudentSections] = useState(() => {
    const saved = localStorage.getItem("studentSections");
    return saved
      ? JSON.parse(saved)
      : [
          { id: 1, title: "Mentees", content: [] },
          { id: 2, title: "Projects", content: [] },
        ];
  });

  const [newStudentSectionTitle, setNewStudentSectionTitle] = useState("");
  const [postType, setPostType] = useState("Post");
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("facultyPosts");
    return saved ? JSON.parse(saved) : [];
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name);
  const [tempQualification, setTempQualification] = useState(qualification);
  const [tempEmail, setTempEmail] = useState(email);
  const [showDropdown, setShowDropdown] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [profileDescription, setProfileDescription] = useState(
    () => localStorage.getItem("facultyProfileDescription") || ""
  );
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [tempProfileDescription, setTempProfileDescription] =
    useState(profileDescription);
  const [researchSections, setResearchSections] = useState(() => {
    const saved = localStorage.getItem("researchSections");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Conference",
            content: [],
            newMessage: "",
            newImage: null,
            newPdf: null,
          },
          {
            id: 2,
            title: "Thesis",
            content: [],
            newMessage: "",
            newImage: null,
            newPdf: null,
          },
        ];
  });
  const [newSectionTitle, setNewSectionTitle] = useState("");

  const dropdownItems = [
    { label: "Thrust Area", key: "thrust-area" },
    { label: "On Going Research Projects", key: "ongoing-research-projects" },
    {
      label: "Completed Research Projects",
      key: "completed-research-projects",
    },
    { label: "Joint Project", key: "joint-project" },
    { label: "Important Laboratories", key: "important-laboratories" },
    { label: "Departmental Committees", key: "departmental-committees" },
    { label: "Alumni Relations", key: "alumni-relations" },
  ];

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result);
        localStorage.setItem("facultyPhoto", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoDelete = () => {
    if (window.confirm("Delete your profile photo?")) {
      setProfilePhoto(null);
      localStorage.removeItem("facultyPhoto");
    }
  };

  const saveChanges = () => {
    setName(tempName);
    setQualification(tempQualification);
    setEmail(tempEmail);
    localStorage.setItem("facultyName", tempName);
    localStorage.setItem("facultyQualification", tempQualification);
    localStorage.setItem("facultyEmail", tempEmail);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        !e.target.closest(".dropdown-toggle") &&
        !e.target.closest(".dropdown-menu")
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const saveResearchSections = (sections) => {
    setResearchSections(sections);
    localStorage.setItem("researchSections", JSON.stringify(sections));
  };

  const handleUpload = (id, type, fileOrText) => {
    const updated = researchSections.map((sec) => {
      if (sec.id === id) {
        const newEntry = { type, data: fileOrText };
        return { ...sec, content: [...sec.content, newEntry] };
      }
      return sec;
    });
    saveResearchSections(updated);
  };

  const handleDeleteEntry = (sectionId, index) => {
    const updated = researchSections.map((sec) => {
      if (sec.id === sectionId) {
        const newContent = [...sec.content];
        newContent.splice(index, 1);
        return { ...sec, content: newContent };
      }
      return sec;
    });
    saveResearchSections(updated);
  };

  const handleDeleteSection = (sectionId) => {
    const updated = researchSections.filter((sec) => sec.id !== sectionId);
    saveResearchSections(updated);
  };

  const handleAddSection = () => {
    if (!newSectionTitle.trim()) return;
    const newSec = {
      id: Date.now(),
      title: newSectionTitle,
      content: [],
      newMessage: "",
      newImage: null,
      newPdf: null,
    };
    const updated = [...researchSections, newSec];
    saveResearchSections(updated);
    setNewSectionTitle("");
  };
  const saveStudentSections = (sections) => {
    setStudentSections(sections);
    localStorage.setItem("studentSections", JSON.stringify(sections));
  };

  const handleStudentUpload = (id, type, fileOrText) => {
    const updated = studentSections.map((sec) => {
      if (sec.id === id) {
        const newEntry = { type, data: fileOrText };
        return { ...sec, content: [...sec.content, newEntry] };
      }
      return sec;
    });
    saveStudentSections(updated);
  };

  const handleDeleteStudentEntry = (sectionId, index) => {
    const updated = studentSections.map((sec) => {
      if (sec.id === sectionId) {
        const newContent = [...sec.content];
        newContent.splice(index, 1);
        return { ...sec, content: newContent };
      }
      return sec;
    });
    saveStudentSections(updated);
  };

  const handleDeleteStudentSection = (sectionId) => {
    const updated = studentSections.filter((sec) => sec.id !== sectionId);
    saveStudentSections(updated);
  };

  const handleAddStudentSection = () => {
    if (!newStudentSectionTitle.trim()) return;
    const newSec = {
      id: Date.now(),
      title: newStudentSectionTitle,
      content: [],
    };
    const updated = [...studentSections, newSec];
    saveStudentSections(updated);
    setNewStudentSectionTitle("");
  };
  const handleAddPost = () => {
    if (!postContent.trim()) return;

    const newPost = {
      id: Date.now(),
      type: postType,
      content: postContent,
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("facultyPosts", JSON.stringify(updatedPosts));
    setPostContent("");
  };

  const handleDeletePost = (id) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
    localStorage.setItem("facultyPosts", JSON.stringify(updated));
  };

  return (
    <>
      <style>{`
        * {
          box-sizing: border-box;
        }
        body {
          margin: 0;
          font-family: 'Segoe UI', sans-serif;
          background: #f7f8f6;
        }

        .container {
          max-width: 1100px;
          margin: 0 auto;
          padding: 20px;
        }

        .amu-header-horizontal {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: #ffffff;
          border-radius: 20px;
          padding: 12px 20px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
          flex-wrap: wrap;
        }

        .amu-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .amu-left img {
          height: 45px;
        }

        .amu-title {
          font-weight: bold;
          font-size: 1.2em;
          color: #004d40;
        }

        .amu-nav {
          display: flex;
          gap: 16px;
          align-items: center;
          flex-wrap: wrap;
        }

        .amu-nav a, .dropdown-toggle {
          text-decoration: none;
          color: #004d40;
          font-weight: 600;
          font-size: 0.95em;
          cursor: pointer;
        }

        .amu-nav a:hover {
          text-decoration: underline;
        }

        .dropdown-wrapper {
          position: relative;
        }

        .dropdown-menu {
          position: absolute;
          background: white;
          border: 1px solid #ccc;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0,0,0,0.1);
          padding: 10px;
          top: 100%;
          right: 0;
          z-index: 999;
          width: 250px;
        }

        .dropdown-menu a {
          display: block;
          padding: 8px;
          color: #004d40;
          text-decoration: none;
          font-size: 14px;
        }

        .dropdown-menu a:hover {
          background: #e0f2f1;
        }

        .amu-underline {
          height: 4px;
          background: #004d40;
          width: 100%;
          border-bottom-left-radius: 4px;
          border-bottom-right-radius: 4px;
          margin-bottom: 20px;
        }

        .profile-container {
          background: #fff;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.05);
          display: flex;
          flex-wrap: wrap;
          gap: 20px;
          align-items: flex-start;
        }

        .photo {
          width: 160px;
          height: 200px;
          background: #eee;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
        }

        .photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .photo input {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
        }

        .info {
          flex: 1;
          min-width: 250px;
        }

        .info p {
          font-size: 1em;
          line-height: 1.6;
          margin: 8px 0;
        }

        .info strong {
          font-weight: bold;
        }

        .info input {
          width: 100%;
          padding: 6px;
          border: 1px solid #ccc;
          border-radius: 4px;
          margin-top: 4px;
        }

        .edit-btn {
          margin-top: 12px;
          padding: 8px 16px;
          background: #004d40;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
        }
        .tabs-section {
            background: #fff;
            margin-top: 30px;
            padding: 20px;
            border-radius: 12px;
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);
          }
          
          .tabs {
            display: flex;
            gap: 10px;
            margin-bottom: 20px;
            flex-wrap: wrap;
          }
          
          .tab {
            padding: 8px 18px;
            background: #f1f1f1;
            border: 1px solid #ccc;
            border-radius: 6px;
            cursor: pointer;
            font-weight: bold;
            color: #004d40;
            transition: 0.3s;
          }
          
          .tab:hover {
            background: #e0f2f1;
          }
          
          .tab.active {
            background: #004d40;
            color: white;
            border-color: #004d40;
          }
          
          .tab-content h3 {
            color: #004d40;
            margin-bottom: 10px;
          }
          
          .amu-footer {
            background-color: #ffffff; 
            color: #004d40;           
            padding: 20px 0;
            margin-top: 40px;
            border-top-left-radius: 20px;
            border-top-right-radius: 20px;
            box-shadow: 0 -2px 6px rgba(0, 0, 0, 0.05);
          }
          
          .footer-container {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 20px;
            display: flex;
            justify-content: space-between;
            flex-wrap: wrap;
            gap: 20px;
          }
          
          .footer-left {
            display: flex;
            align-items: center;
            gap: 15px;
          }
          
          .footer-logo {
            height: 50px;
          }
          
          .footer-text {
            font-size: 0.9em;
            line-height: 1.6;
            color: #004d40;
          }
          
          .footer-right {
            text-align: right;
            font-size: 0.85em;
            color: #004d40;
          }
          
          @media (max-width: 768px) {
            .footer-container {
              flex-direction: column;
              align-items: flex-start;
              text-align: left;
            }
          
            .footer-right {
              text-align: left;
            }
          }
                
          @media (max-width: 768px) {
            .footer-container {
              flex-direction: column;
              align-items: flex-start;
              text-align: left;
            }
          
            .footer-right {
              text-align: left;
            }
          }
          
        @media (max-width: 768px) {
          .amu-header-horizontal {
            flex-direction: column;
            align-items: flex-start;
          }

          .amu-nav {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          @media (max-width: 768px) {
            .amu-header-horizontal,
            .footer-container,
            .profile-container {
              flex-direction: column;
              align-items: flex-start;
            }
          
            .amu-nav {
              flex-direction: column;
              align-items: flex-start;
              gap: 10px;
            }
          
            .footer-right {
              text-align: left;
            }
          
            .photo {
              width: 150px;
              height: 180px;
              aspect-ratio: auto;
              align-self: center;
            }
          }
          

          .profile-container {
            flex-direction: column;
          }

          @media (max-width: 768px) {
            textarea {
              min-height: 120px;
            }
          }
          
        }
      `}</style>

      <div className="container">
        <div className="amu-header-horizontal">
          <div className="amu-left">
            <img
              src="https://amubuddy.com/wp-content/uploads/2023/06/amu-logo.jpg"
              alt="AMU Logo"
            />
            <span className="amu-title">ALIGARH MUSLIM UNIVERSITY</span>
          </div>
          <div className="amu-nav">
            <a href="/">Home</a>
            <a href="/about">About</a>
            <a href="/programs">Programs</a>
            <a href="/faculty">Faculty</a>
            <a href="/contact">Contact</a>
            <div className="dropdown-wrapper">
              <div
                className="dropdown-toggle"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Links ▾
              </div>
              {showDropdown && (
                <div className="dropdown-menu">
                  {dropdownItems.map((item) => (
                    <a
                      key={item.key}
                      href={`https://www.amu.ac.in/department/computer-science#${item.key}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="amu-underline" />

        <div className="profile-container">
          <div className="photo">
            {profilePhoto ? (
              <>
                <img src={profilePhoto} alt="Faculty" />
                <button
                  onClick={handlePhotoDelete}
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    background: "rgba(0,0,0,0.6)",
                    color: "#fff",
                    border: "none",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                >
                  ✖
                </button>
              </>
            ) : (
              <>
                Upload Photo
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                />
              </>
            )}
          </div>

          <div className="info">
            {isEditing ? (
              <>
                <p>
                  <strong>Name:</strong>
                  <br />
                  <input
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                  />
                </p>
                <p>
                  <strong>Qualification:</strong>
                  <br />
                  <input
                    value={tempQualification}
                    onChange={(e) => setTempQualification(e.target.value)}
                  />
                </p>
                <p>
                  <strong>Email:</strong>
                  <br />
                  <input
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                  />
                </p>
                <button className="edit-btn" onClick={saveChanges}>
                  Save
                </button>
              </>
            ) : (
              <>
                <p>
                  <strong>Name:</strong> {name}
                </p>
                <p>
                  <strong>Qualification:</strong> {qualification}
                </p>
                <p>
                  <strong>Email:</strong> {email}
                </p>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setTempName(name);
                    setTempQualification(qualification);
                    setTempEmail(email);
                    setIsEditing(true);
                  }}
                >
                  Edit
                </button>
              </>
            )}
          </div>
        </div>
        {/* Tabs Section */}
        <div className="tabs-section">
          <div className="tabs">
            <button
              className={activeTab === "profile" ? "tab active" : "tab"}
              onClick={() => setActiveTab("profile")}
            >
              PROFILE
            </button>
            <button
              className={activeTab === "research" ? "tab active" : "tab"}
              onClick={() => setActiveTab("research")}
            >
              RESEARCH
            </button>
            <button
              className={activeTab === "student" ? "tab active" : "tab"}
              onClick={() => setActiveTab("student")}
            >
              STUDENT
            </button>
            <button
              className={activeTab === "announcement" ? "tab active" : "tab"}
              onClick={() => setActiveTab("announcement")}
            >
              ANNOUNCEMENT
            </button>
          </div>

          <div className="tab-content">
            {activeTab === "profile" && (
              <div>
                <h3>PROFILE</h3>
                {isEditingProfile ? (
                  <>
                    <textarea
                      style={{
                        width: "100%",
                        minHeight: "150px",
                        padding: "10px",
                        borderRadius: "6px",
                        border: "1px solid #ccc",
                        fontSize: "1em",
                      }}
                      value={tempProfileDescription}
                      onChange={(e) =>
                        setTempProfileDescription(e.target.value)
                      }
                    />
                    <div style={{ marginTop: "10px" }}>
                      <button
                        onClick={() => {
                          setProfileDescription(tempProfileDescription);
                          localStorage.setItem(
                            "facultyProfileDescription",
                            tempProfileDescription
                          );
                          setIsEditingProfile(false);
                        }}
                        className="edit-btn"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setIsEditingProfile(false)}
                        className="edit-btn"
                        style={{ background: "#888", marginLeft: "10px" }}
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    <p style={{ whiteSpace: "pre-line" }}>
                      {profileDescription ||
                        "No profile description added yet."}
                    </p>
                    <div style={{ marginTop: "10px" }}>
                      <button
                        onClick={() => {
                          setTempProfileDescription(profileDescription);
                          setIsEditingProfile(true);
                        }}
                        className="edit-btn"
                      >
                        {profileDescription ? "Edit" : "Add"}
                      </button>
                      {profileDescription && (
                        <button
                          onClick={() => {
                            if (
                              window.confirm("Delete your profile description?")
                            ) {
                              setProfileDescription("");
                              localStorage.removeItem(
                                "facultyProfileDescription"
                              );
                            }
                          }}
                          className="edit-btn"
                          style={{ background: "#b71c1c", marginLeft: "10px" }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
            {activeTab === "research" && (
              <div>
                <h3>RESEARCH</h3>

                {researchSections.map((section) => (
                  <div
                    key={section.id}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "15px",
                      marginBottom: "20px",
                      background: "#fafafa",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4>{section.title}</h4>
                      <button
                        className="edit-btn"
                        style={{ background: "#b71c1c" }}
                        onClick={() => handleDeleteSection(section.id)}
                      >
                        Delete Section
                      </button>
                    </div>

                    {/* Upload Message */}
                    <input
                      type="text"
                      placeholder="Write a message"
                      style={{
                        width: "100%",
                        marginBottom: "10px",
                        padding: "8px",
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          handleUpload(section.id, "message", e.target.value);
                      }}
                    />

                    {/* Upload File (Image or PDF) */}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (file.type.startsWith("image/")) {
                            const reader = new FileReader();
                            reader.onloadend = () =>
                              handleUpload(section.id, "image", reader.result);
                            reader.readAsDataURL(file);
                          } else if (file.type === "application/pdf") {
                            const url = URL.createObjectURL(file);
                            handleUpload(section.id, "pdf", url);
                          } else {
                            alert("Only images and PDFs are allowed.");
                          }
                        }
                      }}
                      style={{ marginBottom: "10px" }}
                    />

                    {/* Display Uploaded Content */}
                    <ul>
                      {section.content.map((entry, idx) => (
                        <li key={idx} style={{ marginBottom: "10px" }}>
                          {entry.type === "message" && <p>{entry.data}</p>}
                          {entry.type === "image" && (
                            <img
                              src={entry.data}
                              alt="upload"
                              style={{ maxWidth: "200px" }}
                            />
                          )}
                          {entry.type === "pdf" && (
                            <a
                              href={entry.data}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View PDF
                            </a>
                          )}
                          <button
                            className="edit-btn"
                            style={{
                              marginLeft: "10px",
                              background: "#b71c1c",
                            }}
                            onClick={() => handleDeleteEntry(section.id, idx)}
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Create new section */}
                <div
                  style={{
                    marginTop: "30px",
                    borderTop: "1px solid #ccc",
                    paddingTop: "20px",
                  }}
                >
                  <h4>Create New Research Section</h4>
                  <input
                    type="text"
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    placeholder="Section title"
                    style={{
                      padding: "8px",
                      width: "60%",
                      marginRight: "10px",
                    }}
                  />
                  <button className="edit-btn" onClick={handleAddSection}>
                    Add Section
                  </button>
                </div>
              </div>
            )}

            {activeTab === "student" && (
              <div>
                <h3>STUDENT</h3>

                {studentSections.map((section) => (
                  <div
                    key={section.id}
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "15px",
                      marginBottom: "20px",
                      background: "#fefefe",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <h4>{section.title}</h4>
                      <button
                        className="edit-btn"
                        style={{ background: "#b71c1c" }}
                        onClick={() => handleDeleteStudentSection(section.id)}
                      >
                        Delete Section
                      </button>
                    </div>

                    {/* Upload Message */}
                    <input
                      type="text"
                      placeholder="Write a message"
                      style={{
                        width: "100%",
                        marginBottom: "10px",
                        padding: "8px",
                      }}
                      onKeyDown={(e) => {
                        if (e.key === "Enter")
                          handleStudentUpload(
                            section.id,
                            "message",
                            e.target.value
                          );
                      }}
                    />

                    {/* Upload File (Image or PDF) */}
                    <input
                      type="file"
                      accept="image/*,application/pdf"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) {
                          if (file.type.startsWith("image/")) {
                            const reader = new FileReader();
                            reader.onloadend = () =>
                              handleStudentUpload(
                                section.id,
                                "image",
                                reader.result
                              );
                            reader.readAsDataURL(file);
                          } else if (file.type === "application/pdf") {
                            const url = URL.createObjectURL(file);
                            handleStudentUpload(section.id, "pdf", url);
                          } else {
                            alert("Only images and PDFs are allowed.");
                          }
                        }
                      }}
                      style={{ marginBottom: "10px" }}
                    />

                    {/* Display Uploaded Content */}
                    <ul>
                      {section.content.map((entry, idx) => (
                        <li key={idx} style={{ marginBottom: "10px" }}>
                          {entry.type === "message" && <p>{entry.data}</p>}
                          {entry.type === "image" && (
                            <img
                              src={entry.data}
                              alt="upload"
                              style={{ maxWidth: "200px" }}
                            />
                          )}
                          {entry.type === "pdf" && (
                            <a
                              href={entry.data}
                              target="_blank"
                              rel="noreferrer"
                            >
                              View PDF
                            </a>
                          )}
                          <button
                            className="edit-btn"
                            style={{
                              marginLeft: "10px",
                              background: "#b71c1c",
                            }}
                            onClick={() =>
                              handleDeleteStudentEntry(section.id, idx)
                            }
                          >
                            Delete
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}

                {/* Create new section */}
                <div
                  style={{
                    marginTop: "30px",
                    borderTop: "1px solid #ccc",
                    paddingTop: "20px",
                  }}
                >
                  <h4>Create New Student Section</h4>
                  <input
                    type="text"
                    value={newStudentSectionTitle}
                    onChange={(e) => setNewStudentSectionTitle(e.target.value)}
                    placeholder="Section title"
                    style={{
                      padding: "8px",
                      width: "60%",
                      marginRight: "10px",
                    }}
                  />
                  <button
                    className="edit-btn"
                    onClick={handleAddStudentSection}
                  >
                    Add Section
                  </button>
                </div>
              </div>
            )}
            {activeTab === "announcement" && (
              <div className="announcement-section">
                <h3>ANNOUNCEMENT</h3>

                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    marginBottom: "10px",
                    flexWrap: "wrap",
                  }}
                >
                  <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                    style={{
                      padding: "6px",
                      fontSize: "1em",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <option value="Post">Post</option>
                    <option value="Announcement">Announcement</option>
                  </select>

                  <input
                    type="text"
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                    placeholder={`Write a ${postType.toLowerCase()}...`}
                    style={{
                      flex: "1",
                      minWidth: "250px",
                      padding: "6px",
                      borderRadius: "6px",
                      border: "1px solid #ccc",
                    }}
                  />

                  <button className="edit-btn" onClick={handleAddPost}>
                    Add
                  </button>
                </div>

                <ul style={{ listStyle: "none", paddingLeft: 0 }}>
                  {posts.map((p) => (
                    <li
                      key={p.id}
                      style={{
                        background:
                          p.type === "Announcement" ? "#fff9c4" : "#f1f1f1",
                        border: "1px solid #ccc",
                        borderRadius: "8px",
                        padding: "10px",
                        marginBottom: "10px",
                      }}
                    >
                      <strong>{p.type}:</strong> {p.content}
                      <button
                        onClick={() => handleDeletePost(p.id)}
                        className="edit-btn"
                        style={{ background: "#b71c1c", marginLeft: "10px" }}
                      >
                        Delete
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
        <footer className="amu-footer">
          <div className="footer-container">
            <div className="footer-left">
              <br />
              Aligarh – 202002, Uttar Pradesh, India
              <br />
              Email: info@amu.ac.in
            </div>

            <div className="footer-right">
              <p>
                © {new Date().getFullYear()} Aligarh Muslim University. All
                rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};
export default FacultyProfile;
