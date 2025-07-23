import React, { useState, useEffect } from "react";

const FacultyProfile = () => {
  // --- Global States for Modals and New Section Inputs ---
  const [showSectionModal, setShowSectionModal] = useState(false); // Controls the "Add New Tab" modal (for custom tabs)
  const [newSectionName, setNewSectionName] = useState(""); // Input for new custom tab name

  const [modalType, setModalType] = useState(null); // 'customTab', 'researchSection', 'studentSection'
  const [newDynamicSectionTitle, setNewDynamicSectionTitle] = useState("");
  const [newDynamicSectionSubheading, setNewDynamicSectionSubheading] = useState("");

  // --- Media Viewer Modals ---
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [currentMediaSrc, setCurrentMediaSrc] = useState(null);
  const [currentMediaName, setCurrentMediaName] = useState("");

  // --- Profile Information States ---
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
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(name); // Initialize temp with current name
  const [tempQualification, setTempQualification] = useState(qualification); // Initialize temp with current qualification
  const [tempEmail, setTempEmail] = useState(email); // Initialize temp with current email


  // --- Header Dropdown States ---
  const [showDropdown, setShowDropdown] = useState(false);
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

  // --- Active Tab State ---
  const [activeTab, setActiveTab] = useState("profile"); // Default active tab

  // --- Profile Description States (Now an array of sections) ---
  const [profileDescriptionSections, setProfileDescriptionSections] = useState(() => {
    const saved = localStorage.getItem("facultyProfileDescriptionSections");
    return saved
      ? JSON.parse(saved)
      : [{ id: 1, content: "This is a default profile description area.", isEditing: false, tempContent: "This is a default profile description area." }];
  });

  // --- Research Sections States ---
  const [researchSections, setResearchSections] = useState(() => {
    const saved = localStorage.getItem("researchSections");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Conference",
            subheading: "Recent Publications",
            description: "Details about recent conferences and publications.",
            isEditingDescription: false,
            tempDescription: "Details about recent conferences and publications.",
            content: [],
          },
          {
            id: 2,
            title: "Thesis",
            subheading: "Doctoral and Masters Thesis",
            description: "Information regarding doctoral and master's theses supervised.",
            isEditingDescription: false,
            tempDescription: "Information regarding doctoral and master's theses supervised.",
            content: [],
          },
        ];
  });

  // --- Student Sections States ---
  const [studentSections, setStudentSections] = useState(() => {
    const saved = localStorage.getItem("studentSections");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Mentees",
            subheading: "Current and Past Students",
            description: "List of students currently being mentored or previously guided.",
            isEditingDescription: false,
            tempDescription: "List of students currently being mentored or previously guided.",
            content: [],
          },
          {
            id: 2,
            title: "Projects",
            subheading: "Student Projects",
            description: "Overview of projects undertaken by students under supervision.",
            isEditingDescription: false,
            tempDescription: "Overview of projects undertaken by students under supervision.",
            content: [],
          },
        ];
  });

  // --- Posts/Announcements States ---
  const [postType, setPostType] = useState("Post");
  const [postContent, setPostContent] = useState("");
  const [posts, setPosts] = useState(() => {
    const saved = localStorage.getItem("facultyPosts");
    return saved ? JSON.parse(saved) : [];
  });

  // --- Custom Tabs States ---
  const [customTabs, setCustomTabs] = useState(() => {
    const saved = localStorage.getItem("customTabs");
    return saved ? JSON.parse(saved) : [];
  });
  const [customSections, setCustomSections] = useState(() => {
    const saved = localStorage.getItem("customSections");
    return saved ? JSON.parse(saved) : {};
  });

  // --- Effects for Local Storage Persistence ---
  useEffect(() => {
    localStorage.setItem("facultyPosts", JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem("facultyProfileDescriptionSections", JSON.stringify(profileDescriptionSections));
  }, [profileDescriptionSections]);

  useEffect(() => {
    localStorage.setItem("researchSections", JSON.stringify(researchSections));
  }, [researchSections]);

  useEffect(() => {
    localStorage.setItem("studentSections", JSON.stringify(studentSections));
  }, [studentSections]);

  useEffect(() => {
    localStorage.setItem("customTabs", JSON.stringify(customTabs));
  }, [customTabs]);

  useEffect(() => {
    localStorage.setItem("customSections", JSON.stringify(customSections));
  }, [customSections]);

  // Effect to close dropdown when clicking outside
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

  // --- Handlers for Profile Photo ---
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

  // --- Handlers for Basic Profile Info ---
  const saveChanges = () => {
    setName(tempName);
    setQualification(tempQualification);
    setEmail(tempEmail);
    localStorage.setItem("facultyName", tempName);
    localStorage.setItem("facultyQualification", tempQualification);
    localStorage.setItem("facultyEmail", tempEmail);
    setIsEditing(false);
  };

  // --- Handlers for Profile Description Sections ---
  const addProfileDescriptionSection = () => {
    const newId = Date.now();
    setProfileDescriptionSections(prev => [
      { id: newId, content: "", isEditing: true, tempContent: "" },
      ...prev,
    ]);
  };

  const deleteProfileDescriptionSection = (id) => {
    if (window.confirm("Are you sure you want to delete this description area?")) {
      setProfileDescriptionSections(prev => prev.filter(sec => sec.id !== id));
    }
  };

  const handleEditProfileDescription = (id) => {
    setProfileDescriptionSections(prev => prev.map(sec =>
      sec.id === id ? { ...sec, isEditing: true, tempContent: sec.content } : sec
    ));
  };

  const saveProfileDescription = (id) => {
    setProfileDescriptionSections(prev => prev.map(sec =>
      sec.id === id ? { ...sec, content: sec.tempContent, isEditing: false } : sec
    ));
  };

  const cancelEditProfileDescription = (id) => {
    setProfileDescriptionSections(prev => prev.map(sec =>
      sec.id === id ? { ...sec, isEditing: false, tempContent: sec.content } : sec
    ));
  };

  // --- Generic Content Upload Handler for Research, Student, Custom Sections ---
  const handleContentUpload = (sectionId, sectionType, type, data, fileName = "") => {
    let updatedSections;
    const contentItem = { type, data, name: fileName }; // Include file name for PDFs/Images
    if (sectionType === 'research') {
      updatedSections = researchSections.map(sec =>
        sec.id === sectionId ? { ...sec, content: [...sec.content, contentItem] } : sec
      );
      setResearchSections(updatedSections);
    } else if (sectionType === 'student') {
      updatedSections = studentSections.map(sec =>
        sec.id === sectionId ? { ...sec, content: [...sec.content, contentItem] } : sec
      );
      setStudentSections(updatedSections);
    } else if (sectionType === 'custom') {
      const updatedCustomSections = { ...customSections };
      updatedCustomSections[sectionId].content.push(contentItem);
      setCustomSections(updatedCustomSections);
    }
  };

  // --- Generic Content Deletion Handler for Research, Student, Custom Sections ---
  const handleDeleteContentEntry = (sectionId, sectionType, index) => {
    let updatedSections;
    if (sectionType === 'research') {
      updatedSections = researchSections.map(sec =>
        sec.id === sectionId ? { ...sec, content: sec.content.filter((_, idx) => idx !== index) } : sec
      );
      setResearchSections(updatedSections);
    } else if (sectionType === 'student') {
      updatedSections = studentSections.map(sec =>
        sec.id === sectionId ? { ...sec, content: sec.content.filter((_, idx) => idx !== index) } : sec
      );
      setStudentSections(updatedSections);
    } else if (sectionType === 'custom') {
      const updatedCustomSections = { ...customSections };
      updatedCustomSections[sectionId].content.splice(index, 1);
      setCustomSections(updatedCustomSections);
    }
  };

  // --- Generic Section Deletion Handler for Research, Student, Custom Sections ---
  const handleDeleteSection = (sectionId, sectionType) => {
    if (window.confirm(`Are you sure you want to delete this ${sectionType} section?`)) {
      if (sectionType === 'research') {
        setResearchSections(researchSections.filter(sec => sec.id !== sectionId));
      } else if (sectionType === 'student') {
        setStudentSections(studentSections.filter(sec => sec.id !== sectionId));
      } else if (sectionType === 'custom') {
        const updatedTabs = customTabs.filter(tab => tab.id !== sectionId);
        const updatedSections = { ...customSections };
        delete updatedSections[sectionId];
        setCustomTabs(updatedTabs);
        setCustomSections(updatedSections);
        setActiveTab("profile"); // Fallback to profile after deleting custom tab
      }
    }
  };

  // --- Handlers for Posts ---
  const handleAddPost = () => {
    if (!postContent.trim()) return;

    const newPost = {
      id: Date.now(),
      type: postType,
      content: postContent,
      timestamp: new Date().toLocaleString(), // Add timestamp
    };

    const updatedPosts = [newPost, ...posts]; // Add new post to the top
    setPosts(updatedPosts);
    setPostContent("");
  };

  const handleDeletePost = (id) => {
    const updated = posts.filter((p) => p.id !== id);
    setPosts(updated);
  };

  // --- Handlers for Dynamic Section Creation (Research, Student, Custom) ---
  const openDynamicSectionModal = (type) => {
    setModalType(type);
    setNewDynamicSectionTitle("");
    setNewDynamicSectionSubheading("");
    setShowSectionModal(true);
  };

  const handleCreateDynamicSection = () => {
    if (!newDynamicSectionTitle.trim()) {
      alert("Section name cannot be empty.");
      return;
    }

    const newId = Date.now();
    const newSection = {
      id: newId,
      title: newDynamicSectionTitle,
      subheading: newDynamicSectionSubheading,
      description: "",
      isEditingDescription: false,
      tempDescription: "",
      content: [],
    };

    if (modalType === 'researchSection') {
      setResearchSections(prev => [newSection, ...prev]); // Add to top
    } else if (modalType === 'studentSection') {
      setStudentSections(prev => [newSection, ...prev]); // Add to top
    } else if (modalType === 'customTab') {
      setCustomTabs(prev => [...prev, { id: newId.toString(), name: newDynamicSectionTitle }]); // Add to end of tabs
      setCustomSections(prev => ({
        ...prev,
        [newId.toString()]: {
          title: newDynamicSectionTitle,
          subheading: newDynamicSectionSubheading,
          description: "",
          isEditingDescription: false,
          tempDescription: "",
          content: [],
        }
      }));
      setActiveTab(newId.toString()); // Switch to the new custom tab
    }

    setShowSectionModal(false);
    setNewDynamicSectionTitle("");
    setNewDynamicSectionSubheading("");
    setModalType(null);
  };

  // --- Handlers for Section Description Editing ---
  const handleEditSectionDescription = (sectionId, sectionType, currentDescription) => {
    if (sectionType === 'research') {
      setResearchSections(prev => prev.map(sec =>
        sec.id === sectionId ? { ...sec, isEditingDescription: true, tempDescription: currentDescription } : sec
      ));
    } else if (sectionType === 'student') {
      setStudentSections(prev => prev.map(sec =>
        sec.id === sectionId ? { ...sec, isEditingDescription: true, tempDescription: currentDescription } : sec
      ));
    } else if (sectionType === 'custom') {
      setCustomSections(prev => ({
        ...prev,
        [sectionId]: { ...prev[sectionId], isEditingDescription: true, tempDescription: currentDescription }
      }));
    }
  };

  const saveSectionDescription = (sectionId, sectionType) => {
    if (sectionType === 'research') {
      setResearchSections(prev => prev.map(sec =>
        sec.id === sectionId ? { ...sec, description: sec.tempDescription, isEditingDescription: false } : sec
      ));
    } else if (sectionType === 'student') {
      setStudentSections(prev => prev.map(sec =>
        sec.id === sectionId ? { ...sec, description: sec.tempDescription, isEditingDescription: false } : sec
      ));
    } else if (sectionType === 'custom') {
      setCustomSections(prev => ({
        ...prev,
        [sectionId]: { ...prev[sectionId], description: prev[sectionId].tempDescription, isEditingDescription: false }
      }));
    }
  };

  const cancelEditSectionDescription = (sectionId, sectionType) => {
    if (sectionType === 'research') {
      setResearchSections(prev => prev.map(sec =>
        sec.id === sectionId ? { ...sec, isEditingDescription: false, tempDescription: sec.description } : sec
      ));
    } else if (sectionType === 'student') {
      setStudentSections(prev => prev.map(sec =>
        sec.id === sectionId ? { ...sec, isEditingDescription: false, tempDescription: sec.description } : sec
      ));
    } else if (sectionType === 'custom') {
      setCustomSections(prev => ({
        ...prev,
        [sectionId]: { ...prev[sectionId], isEditingDescription: false, tempContent: prev[sectionId].description }
      }));
    }
  };

  // --- Media Viewer Handlers ---
  const openImageModal = (src, name) => {
    setCurrentMediaSrc(src);
    setCurrentMediaName(name);
    setShowImageModal(true);
  };

  const openPdfModal = (src, name) => {
    setCurrentMediaSrc(src);
    setCurrentMediaName(name);
    setShowPdfModal(true);
  };

  const closeMediaModals = () => {
    setShowImageModal(false);
    setShowPdfModal(false);
    setCurrentMediaSrc(null);
    setCurrentMediaName("");
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
          margin-bottom: 20px;
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
          transition: color 0.2s ease-in-out;
        }

        .amu-nav a:hover, .dropdown-toggle:hover {
          color: #00796b;
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
          min-width: 250px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }

        .dropdown-menu a {
          display: block;
          padding: 8px;
          color: #004d40;
          text-decoration: none;
          font-size: 14px;
          transition: background-color 0.2s ease-in-out;
        }

        .dropdown-menu a:hover {
          background: #e0f2f1;
          border-radius: 4px;
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
          margin-bottom: 30px;
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
          border: 1px solid #ddd;
          cursor: pointer; /* Make the whole area clickable */
        }

        .photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .photo-input-label { /* Style for the new label */
            position: absolute;
            bottom: 5px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            cursor: pointer;
            opacity: 0;
            transition: opacity 0.2s ease;
            white-space: nowrap; /* Prevent text wrap */
        }
        .photo:hover .photo-input-label {
            opacity: 1;
        }

        .photo input[type="file"] {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          cursor: pointer;
          z-index: 10; /* Make it clickable */
        }

        .photo-actions {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-top: 10px;
        }

        .photo-actions button {
          padding: 6px 10px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 0.85em;
        }

        .photo-actions .delete-btn {
          background-color: #dc3545;
          color: white;
        }
        .photo-actions .delete-btn:hover {
          background-color: #c82333;
        }


        .info {
          flex: 1;
          min-width: 280px;
        }

        .info p {
          font-size: 1em;
          line-height: 1.6;
          margin: 8px 0;
          color: #333;
        }

        .info strong {
          font-weight: bold;
          color: #004d40;
        }

        .info input[type="text"],
        .info textarea {
          width: 100%;
          padding: 8px 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          margin-top: 4px;
          font-size: 0.95em;
          font-family: 'Segoe UI', sans-serif;
        }

        .info textarea {
          min-height: 80px;
          resize: vertical;
        }

        .edit-btn, .save-btn, .cancel-btn {
          margin-top: 12px;
          padding: 8px 16px;
          background: #004d40;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9em;
          transition: background-color 0.2s ease-in-out;
        }
        .edit-btn:hover, .save-btn:hover {
          background-color: #00796b;
        }
        .cancel-btn {
          background-color: #6c757d;
          margin-left: 10px;
        }
        .cancel-btn:hover {
          background-color: #5a6268;
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
          gap: 8px; /* Reduced gap */
          margin-bottom: 20px;
          flex-wrap: wrap;
          border-bottom: 1px solid #eee;
          padding-bottom: 10px;
        }

        .tab {
          padding: 8px 18px;
          background: #f1f1f1;
          border: 1px solid #ccc;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          color: #004d40;
          transition: 0.3s;
          white-space: nowrap; /* Prevent wrapping */
          display: flex;
          align-items: center;
          gap: 5px;
        }

        .tab:hover {
          background: #e0f2f1;
        }

        .tab.active {
          background: #004d40;
          color: white;
          border-color: #004d40;
        }

        .add-tab-btn {
          padding: 8px 18px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
          transition: background-color 0.2s ease-in-out;
          white-space: nowrap;
        }
        .add-tab-btn:hover {
          background-color: #218838;
        }
        .tab .delete-tab-btn {
            background: none;
            border: none;
            color: white; /* Inherit color from active tab */
            font-size: 1.2em;
            cursor: pointer;
            padding: 0 0 2px 5px; /* Adjust padding */
            transition: color 0.2s ease-in-out;
            line-height: 1; /* Adjust line height */
        }
        .tab.active .delete-tab-btn {
            color: white;
        }
        .tab:not(.active) .delete-tab-btn {
            color: #004d40;
        }
        .tab .delete-tab-btn:hover {
            color: #ff4d4d;
        }

        .tab-content h3 {
          color: #004d40;
          margin-bottom: 15px;
          border-bottom: 2px solid #e0f2f1;
          padding-bottom: 8px;
        }

        .section-input-group {
          display: flex;
          gap: 10px;
          margin-top: 15px;
          margin-bottom: 20px;
          flex-wrap: wrap;
          align-items: center;
        }
        .section-input-group button {
          padding: 8px 15px;
          background-color: #00796b;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }
        .section-input-group button:hover {
          background-color: #00695c;
        }

        .section-block {
          background: #fdfdfd;
          border: 1px solid #e0e0e0;
          border-radius: 10px;
          padding: 20px;
          margin-bottom: 20px;
          box-shadow: 0 2px 5px rgba(0,0,0,0.03);
        }

        .section-block h4 {
          margin-top: 0;
          margin-bottom: 10px;
          color: #004d40;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .section-block h5 {
          margin-top: -5px;
          margin-bottom: 15px;
          color: #555;
          font-weight: normal;
          font-size: 0.95em;
        }

        .section-description-area {
          margin-bottom: 20px;
          padding: 15px;
          background: #f5f5f5;
          border: 1px solid #e0e0e0;
          border-radius: 8px;
        }
        .section-description-area p {
          margin: 0;
          font-size: 0.9em;
          color: #444;
          line-height: 1.5;
          white-space: pre-line;
        }
        .section-description-area textarea {
          width: 100%; /* Make it full width */
          min-height: 100px; /* Default for all section descriptions */
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          resize: vertical;
          font-family: 'Segoe UI', sans-serif;
        }

        .profile-description-item textarea {
            min-height: 150px; /* Larger for profile description */
            width: 100%; /* Make it full width */
        }

        .profile-description-item {
            background: #f9f9f9;
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            position: relative;
        }
        .profile-description-item .actions {
            margin-top: 10px;
            display: flex;
            gap: 10px;
            justify-content: flex-end;
        }
        .profile-description-item .delete-profile-desc-btn {
            position: absolute;
            top: 10px;
            right: 10px;
            background: none;
            border: none;
            color: #dc3545;
            font-size: 1.5em;
            cursor: pointer;
            line-height: 1;
        }
        .profile-description-item .delete-profile-desc-btn:hover {
            color: #c82333;
        }

        .section-item {
          background: #f9f9f9;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
          align-items: center; /* Center items vertically */
          gap: 15px;
          flex-wrap: wrap; /* Allow content to wrap */
        }
        .section-item p {
          margin: 0;
          font-size: 0.95em;
          color: #333;
          flex: 1; /* Allow text to take available space */
          min-width: 150px; /* Ensure text doesn't get too narrow */
          white-space: pre-line; /* Preserve new lines in text content */
        }
        .section-item .media-preview {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          color: #004d40;
          font-weight: 500;
          flex: 1; /* Allow preview to take space */
          min-width: 150px;
        }
        .section-item .media-preview:hover {
          text-decoration: underline;
        }
        .section-item .media-preview img {
          width: 50px; /* Thumbnail size */
          height: 50px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        .section-item .media-preview .pdf-icon {
          font-size: 30px;
          color: #dc3545; /* Red for PDF */
        }
        .section-item a {
          color: #004d40;
          text-decoration: none;
          font-weight: 500;
        }
        .section-item a:hover {
          text-decoration: underline;
        }
        .section-item .delete-entry-btn {
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          cursor: pointer;
          font-size: 0.8em;
          transition: background-color 0.2s ease-in-out;
          align-self: center; /* Vertically align delete button */
        }
        .section-item .delete-entry-btn:hover {
          background-color: #c82333;
        }

        .add-content-form {
          margin-top: 20px;
          padding: 15px;
          border: 1px dashed #ccc;
          border-radius: 8px;
          background: #fcfcfc;
        }
        .add-content-form textarea {
          width: 100%;
          min-height: 60px;
          padding: 8px;
          border: 1px solid #ddd;
          border-radius: 5px;
          margin-bottom: 10px;
          font-family: 'Segoe UI', sans-serif;
        }
        .add-content-form input[type="file"] {
          margin-bottom: 10px;
          border: 1px solid #ddd;
          padding: 8px;
          border-radius: 5px;
          width: 100%;
          background: white; /* Ensure file input background is white */
        }
        .add-content-form button {
          padding: 8px 15px;
          background-color: #00796b;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }
        .add-content-form button:hover {
          background-color: #00695c;
        }

        .post-input-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }
        .post-input-group select {
          padding: 8px;
          border: 1px solid #ccc;
          border-radius: 6px;
          width: 100%;
          max-width: 200px;
        }
        .post-input-group textarea {
          width: 100%;
          min-height: 100px;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 6px;
          resize: vertical;
          font-family: 'Segoe UI', sans-serif;
        }
        .post-input-group button {
          padding: 10px 20px;
          background-color: #004d40;
          color: white;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }
        .post-input-group button:hover {
          background-color: #00796b;
        }

        .post-item {
          background: #f9f9f9;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 10px;
        }
        .post-item p {
          margin: 0 0 8px 0;
          color: #333;
          line-height: 1.5;
          white-space: pre-line; /* Preserve new lines in post content */
        }
        .post-item small {
          color: #777;
          font-size: 0.85em;
          display: block;
          margin-bottom: 5px;
        }
        .post-item .delete-post-btn {
          background: #dc3545;
          color: white;
          border: none;
          border-radius: 5px;
          padding: 5px 10px;
          cursor: pointer;
          font-size: 0.8em;
          transition: background-color 0.2s ease-in-out;
        }
        .post-item .delete-post-btn:hover {
          background-color: #c82333;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6); /* Darker overlay */
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px); /* Optional: blur background */
        }

        .modal-content {
          background: white;
          padding: 30px;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          width: 90%;
          max-width: 500px;
          position: relative;
        }

        .modal-content h3 {
          margin-top: 0;
          color: #004d40;
          margin-bottom: 20px;
        }

        .modal-content input[type="text"],
        .modal-content textarea {
          width: 100%;
          padding: 10px;
          margin-bottom: 15px;
          border: 1px solid #ccc;
          border-radius: 6px;
        }

        .modal-actions {
          display: flex;
          justify-content: flex-end;
          gap: 10px;
        }

        .modal-actions button {
          padding: 10px 20px;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 600;
        }

        .modal-actions .create-btn {
          background-color: #004d40;
          color: white;
        }
        .modal-actions .create-btn:hover {
          background-color: #00796b;
        }

        .modal-actions .close-btn {
          background-color: #6c757d;
          color: white;
        }
        .modal-actions .close-btn:hover {
          background-color: #5a6268;
        }

        /* Media Modal Specific Styles */
        .media-modal-content {
            background: rgba(0,0,0,0.8);
            padding: 0;
            border-radius: 0;
            max-width: 90vw;
            max-height: 90vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            position: relative;
            box-shadow: none;
        }
        .media-modal-content img {
            max-width: 100%;
            max-height: 80vh;
            object-fit: contain;
        }
        .media-modal-content .pdf-viewer {
            width: 95%;
            height: 80vh;
            border: none;
        }
        .media-modal-content .close-media-btn {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(255, 255, 255, 0.2);
            color: white;
            border: none;
            border-radius: 50%;
            width: 40px;
            height: 40px;
            font-size: 1.8em;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1001;
            transition: background-color 0.2s ease;
        }
        .media-modal-content .close-media-btn:hover {
            background: rgba(255, 255, 255, 0.4);
        }
        .media-modal-content .download-media-btn { /* Combined style for image and PDF download */
            margin-top: 15px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            font-size: 1em;
            display: inline-block; /* Ensure it behaves like a button */
        }
        .media-modal-content .download-media-btn:hover {
            background-color: #0056b3;
        }
        .media-modal-content .media-title {
            color: white;
            font-size: 1.2em;
            margin-bottom: 10px;
            text-align: center;
            word-break: break-all;
            padding: 0 20px;
        }


        .amu-footer {
          background-color: #ffffff;
          color: #004d40;
          padding: 20px 0;
          margin-top: 40px;
          border-top-left-radius: 20px;
          border-top-right-radius: 20px;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
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
          .amu-header-horizontal {
            flex-direction: column;
            align-items: flex-start;
          }

          .amu-nav {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
            margin-top: 15px;
            width: 100%; /* Ensure navigation items take full width */
          }
          .amu-nav a, .dropdown-toggle {
            width: 100%;
            text-align: left;
          }

          .dropdown-wrapper {
            width: 100%;
          }
          .dropdown-menu {
            position: static; /* Change to static for mobile */
            width: 100%;
            box-shadow: none;
            border: none;
            padding: 0;
            margin-top: 5px;
          }

          .footer-container {
            flex-direction: column;
            align-items: flex-start;
            text-align: left;
          }

          .footer-right {
            text-align: left;
          }

          .profile-container {
            flex-direction: column;
            align-items: center;
          }

          .photo {
            width: 150px;
            height: 180px;
            align-self: center;
          }
          .info {
            min-width: unset; /* Remove min-width on small screens */
            width: 100%; /* Take full width */
          }

          .tabs {
            flex-direction: column;
            align-items: flex-start;
          }
          .tab, .add-tab-btn {
            width: 100%; /* Tabs take full width on small screens */
            text-align: left;
            justify-content: space-between; /* To push delete button to end */
          }
          .section-input-group {
            flex-direction: column;
            gap: 15px;
            align-items: stretch;
          }
          .section-input-group input, .section-input-group button {
            width: 100%;
          }
          .section-item {
            flex-direction: column;
            align-items: stretch;
          }
          .section-item .delete-entry-btn {
            align-self: flex-end;
            margin-top: 10px;
          }
        }
      `}</style>
      <div className="container">
        {/* Header Section */}
        <header className="amu-header-horizontal">
          <div className="amu-left">
            <img src="https://amubuddy.com/wp-content/uploads/2023/06/amu-logo.jpg" alt="AMU Logo" className="amu-logo" />
            <span className="amu-title">Aligarh Muslim University</span>
          </div>
          <nav className="amu-nav">
            <a href="#">Home</a>
            <a href="#">About</a>
            <a href="#">Programs</a>
            <a href="#">Faculty</a>
            <a href="#">Contact</a>
            <div className="dropdown-wrapper">
              <span
                className="dropdown-toggle"
                onClick={() => setShowDropdown(!showDropdown)}
              >
                Links ▼
              </span>
              {showDropdown && (
                <div className="dropdown-menu">
                  {dropdownItems.map((item) => (
                    <a href="#" key={item.key}>
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </header>
        <div className="amu-underline"></div>

        {/* Profile Section */}
        <section className="profile-container">
          <div className="photo" onClick={() => document.getElementById('upload-photo-input').click()}>
            {profilePhoto ? (
              <img src={profilePhoto} alt="Faculty Profile" />
            ) : (
              <span>Upload Photo</span>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              id="upload-photo-input"
              style={{ display: 'none' }} // Hide the actual input
            />
            {/* The label is now primarily for hover effect and accessibility */}
            <label htmlFor="upload-photo-input" className="photo-input-label">
              {profilePhoto ? "Change Photo" : "Upload Photo"}
            </label>
          </div>
          <div className="photo-actions">
            {profilePhoto && (
              <button onClick={handlePhotoDelete} className="delete-btn">
                Delete Photo
              </button>
            )}
          </div>

          <div className="info">
            {isEditing ? (
              <>
                <p>
                  <strong>Name:</strong>{" "}
                  <input
                    type="text"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                  />
                </p>
                <p>
                  <strong>Qualification:</strong>{" "}
                  <input
                    type="text"
                    value={tempQualification}
                    onChange={(e) => setTempQualification(e.target.value)}
                  />
                </p>
                <p>
                  <strong>Email:</strong>{" "}
                  <input
                    type="text"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                  />
                </p>
                <button onClick={saveChanges} className="save-btn">
                  Save
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="cancel-btn"
                >
                  Cancel
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
                <button onClick={() => {
                    setIsEditing(true);
                    setTempName(name); // Load current values into temp states on edit
                    setTempQualification(qualification);
                    setTempEmail(email);
                }} className="edit-btn">
                  Edit Profile
                </button>
              </>
            )}
          </div>
        </section>

        {/* Tabs Section */}
        <section className="tabs-section">
          <div className="tabs">
            <button
              className={`tab ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              Profile Description
            </button>
            <button
              className={`tab ${activeTab === "research" ? "active" : ""}`}
              onClick={() => setActiveTab("research")}
            >
              Research
            </button>
            <button
              className={`tab ${activeTab === "students" ? "active" : ""}`}
              onClick={() => setActiveTab("students")}
            >
              Students
            </button>
            <button
              className={`tab ${activeTab === "posts" ? "active" : ""}`}
              onClick={() => setActiveTab("posts")}
            >
              Posts
            </button>
            {customTabs.map((tab) => (
              <button
                key={tab.id}
                className={`tab ${activeTab === tab.id ? "active" : ""}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.name}
                <button
                  className="delete-tab-btn"
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent tab change on delete click
                    handleDeleteSection(tab.id, 'custom');
                  }}
                  title="Delete Tab"
                >
                  &times;
                </button>
              </button>
            ))}
            <button
              className="add-tab-btn"
              onClick={() => openDynamicSectionModal('customTab')}
            >
              + Add New Tab
            </button>
          </div>

          <div className="tab-content">
            {/* Profile Description Tab */}
            {activeTab === "profile" && (
              <div>
                <h3>Profile Description</h3>
                <button onClick={addProfileDescriptionSection} className="edit-btn" style={{ marginBottom: '15px' }}>
                  + Add New Description Area
                </button>

                {profileDescriptionSections.length === 0 ? (
                  <p>No profile description areas added yet.</p>
                ) : (
                  profileDescriptionSections.map((section) => (
                    <div key={section.id} className="profile-description-item">
                      <button
                        className="delete-profile-desc-btn"
                        onClick={() => deleteProfileDescriptionSection(section.id)}
                        title="Delete Description Area"
                      >
                        &times;
                      </button>
                      {section.isEditing ? (
                        <>
                          <textarea
                            className="profile-description-area"
                            value={section.tempContent}
                            onChange={(e) => setProfileDescriptionSections(prev => prev.map(s =>
                              s.id === section.id ? { ...s, tempContent: e.target.value } : s
                            ))}
                            placeholder="Enter your profile description here..."
                          ></textarea>
                          <div className="actions">
                            <button onClick={() => saveProfileDescription(section.id)} className="save-btn">
                              Save
                            </button>
                            <button
                              onClick={() => cancelEditProfileDescription(section.id)}
                              className="cancel-btn"
                            >
                              Cancel
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          <p>{section.content || "No description content."}</p>
                          <div className="actions">
                            <button
                              onClick={() => handleEditProfileDescription(section.id)}
                              className="edit-btn"
                            >
                              Edit
                            </button>
                          </div>
                        </>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Research Tab */}
            {activeTab === "research" && (
              <div>
                <h3>Research</h3>
                <div className="section-input-group">
                  <button onClick={() => openDynamicSectionModal('researchSection')}>
                    + Add New Research Section
                  </button>
                </div>
                {researchSections.map((section) => (
                  <div key={section.id} className="section-block">
                    <h4>
                      {section.title}{" "}
                      <button
                        onClick={() => handleDeleteSection(section.id, 'research')}
                        className="delete-entry-btn"
                      >
                        Delete Section
                      </button>
                    </h4>
                    {section.subheading && <h5>{section.subheading}</h5>}

                    {/* Section Description Area */}
                    <div className="section-description-area">
                      {section.isEditingDescription ? (
                        <>
                          <textarea
                            value={section.tempDescription}
                            onChange={(e) => setResearchSections(prev => prev.map(sec =>
                              sec.id === section.id ? { ...sec, tempDescription: e.target.value } : sec
                            ))}
                            placeholder="Add a description for this section..."
                          ></textarea>
                          <button onClick={() => saveSectionDescription(section.id, 'research')} className="save-btn">Save Description</button>
                          <button onClick={() => cancelEditSectionDescription(section.id, 'research')} className="cancel-btn">Cancel</button>
                        </>
                      ) : (
                        <>
                          <p>{section.description || "No description added for this section."}</p>
                          <button onClick={() => handleEditSectionDescription(section.id, 'research', section.description)} className="edit-btn">
                            {section.description ? "Edit Description" : "Add Description"}
                          </button>
                        </>
                      )}
                    </div>

                    <div className="add-content-form">
                      <textarea
                        placeholder={`Add text for ${section.title}... (Press Enter to add)`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (e.target.value.trim()) {
                                handleContentUpload(section.id, 'research', 'text', e.target.value);
                                e.target.value = '';
                            }
                          }
                        }}
                      ></textarea>
                      <label htmlFor={`research-image-upload-${section.id}`} className="file-input-label">
                        Upload Image
                        <input
                            id={`research-image-upload-${section.id}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        handleContentUpload(section.id, 'research', 'image', reader.result, file.name);
                                        e.target.value = ''; // Clear input
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            style={{ display: 'block', width: '100%', border: '1px solid #ddd', borderRadius: '5px', padding: '8px' }}
                        />
                      </label>

                      <label htmlFor={`research-pdf-upload-${section.id}`} className="file-input-label">
                        Upload PDF
                        <input
                            id={`research-pdf-upload-${section.id}`}
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        handleContentUpload(section.id, 'research', 'pdf', reader.result, file.name);
                                        e.target.value = ''; // Clear input
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            style={{ display: 'block', width: '100%', border: '1px solid #ddd', borderRadius: '5px', padding: '8px' }}
                        />
                      </label>
                    </div>
                    {section.content.length === 0 ? (
                      <p>No content in this section yet.</p>
                    ) : (
                      section.content.map((item, idx) => (
                        <div key={idx} className="section-item">
                          {item.type === "text" && <p>{item.data}</p>}
                          {item.type === "image" && (
                            <div className="media-preview" onClick={() => openImageModal(item.data, item.name)}>
                                <img src={item.data} alt="Uploaded" />
                                <span>{item.name || "Image"}</span>
                            </div>
                          )}
                          {item.type === "pdf" && (
                            <div className="media-preview" onClick={() => openPdfModal(item.data, item.name)}>
                                <span className="pdf-icon">📄</span> {/* PDF icon */}
                                <span>{item.name || "PDF Document"}</span>
                            </div>
                          )}
                          <button
                            onClick={() => handleDeleteContentEntry(section.id, 'research', idx)}
                            className="delete-entry-btn"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Students Tab */}
            {activeTab === "students" && (
              <div>
                <h3>Students</h3>
                <div className="section-input-group">
                  <button onClick={() => openDynamicSectionModal('studentSection')}>
                    + Add New Student Section
                  </button>
                </div>
                {studentSections.map((section) => (
                  <div key={section.id} className="section-block">
                    <h4>
                      {section.title}{" "}
                      <button
                        onClick={() => handleDeleteSection(section.id, 'student')}
                        className="delete-entry-btn"
                      >
                        Delete Section
                      </button>
                    </h4>
                    {section.subheading && <h5>{section.subheading}</h5>}

                    {/* Section Description Area */}
                    <div className="section-description-area">
                      {section.isEditingDescription ? (
                        <>
                          <textarea
                            value={section.tempDescription}
                            onChange={(e) => setStudentSections(prev => prev.map(sec =>
                              sec.id === section.id ? { ...sec, tempDescription: e.target.value } : sec
                            ))}
                            placeholder="Add a description for this section..."
                          ></textarea>
                          <button onClick={() => saveSectionDescription(section.id, 'student')} className="save-btn">Save Description</button>
                          <button onClick={() => cancelEditSectionDescription(section.id, 'student')} className="cancel-btn">Cancel</button>
                        </>
                      ) : (
                        <>
                          <p>{section.description || "No description added for this section."}</p>
                          <button onClick={() => handleEditSectionDescription(section.id, 'student', section.description)} className="edit-btn">
                            {section.description ? "Edit Description" : "Add Description"}
                          </button>
                        </>
                      )}
                    </div>

                    <div className="add-content-form">
                      <textarea
                        placeholder={`Add text for ${section.title}... (Press Enter to add)`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (e.target.value.trim()) {
                                handleContentUpload(section.id, 'student', 'text', e.target.value);
                                e.target.value = '';
                            }
                          }
                        }}
                      ></textarea>
                      <label htmlFor={`student-image-upload-${section.id}`} className="file-input-label">
                        Upload Image
                        <input
                            id={`student-image-upload-${section.id}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        handleContentUpload(section.id, 'student', 'image', reader.result, file.name);
                                        e.target.value = '';
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            style={{ display: 'block', width: '100%', border: '1px solid #ddd', borderRadius: '5px', padding: '8px' }}
                        />
                      </label>
                      <label htmlFor={`student-pdf-upload-${section.id}`} className="file-input-label">
                        Upload PDF
                        <input
                            id={`student-pdf-upload-${section.id}`}
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        handleContentUpload(section.id, 'student', 'pdf', reader.result, file.name);
                                        e.target.value = '';
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            style={{ display: 'block', width: '100%', border: '1px solid #ddd', borderRadius: '5px', padding: '8px' }}
                        />
                      </label>
                    </div>
                    {section.content.length === 0 ? (
                      <p>No content in this section yet.</p>
                    ) : (
                      section.content.map((item, idx) => (
                        <div key={idx} className="section-item">
                          {item.type === "text" && <p>{item.data}</p>}
                          {item.type === "image" && (
                            <div className="media-preview" onClick={() => openImageModal(item.data, item.name)}>
                                <img src={item.data} alt="Uploaded" />
                                <span>{item.name || "Image"}</span>
                            </div>
                          )}
                          {item.type === "pdf" && (
                            <div className="media-preview" onClick={() => openPdfModal(item.data, item.name)}>
                                <span className="pdf-icon">📄</span>
                                <span>{item.name || "PDF Document"}</span>
                            </div>
                          )}
                          <button
                            onClick={() => handleDeleteContentEntry(section.id, 'student', idx)}
                            className="delete-entry-btn"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Posts Tab */}
            {activeTab === "posts" && (
              <div>
                <h3>Announcements / Posts</h3>
                <div className="post-input-group">
                  <select
                    value={postType}
                    onChange={(e) => setPostType(e.target.value)}
                  >
                    <option value="Post">General Post</option>
                    <option value="Announcement">Announcement</option>
                    <option value="News">News</option>
                  </select>
                  <textarea
                    placeholder="Write your post here..."
                    value={postContent}
                    onChange={(e) => setPostContent(e.target.value)}
                  ></textarea>
                  <button onClick={handleAddPost}>Add Post</button>
                </div>
                {posts.length === 0 ? (
                  <p>No posts yet.</p>
                ) : (
                  <div className="posts-list">
                    {posts.map((post) => (
                      <div key={post.id} className="post-item">
                        <small>{post.timestamp}</small>
                        <p>
                          <strong>[{post.type}]</strong> {post.content}
                        </p>
                        <button
                          onClick={() => handleDeletePost(post.id)}
                          className="delete-post-btn"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Custom Tabs Content */}
            {customTabs.map(
              (tab) =>
                activeTab === tab.id && (
                  <div key={tab.id} className="section-block">
                    <h4>{customSections[tab.id]?.title || tab.name}</h4>
                    {customSections[tab.id]?.subheading && <h5>{customSections[tab.id].subheading}</h5>}

                    {/* Section Description Area for Custom Tabs */}
                    <div className="section-description-area">
                      {customSections[tab.id]?.isEditingDescription ? (
                        <>
                          <textarea
                            value={customSections[tab.id].tempDescription}
                            onChange={(e) => setCustomSections(prev => ({
                              ...prev,
                              [tab.id]: { ...prev[tab.id], tempDescription: e.target.value }
                            }))}
                            placeholder="Add a description for this section..."
                          ></textarea>
                          <button onClick={() => saveSectionDescription(tab.id, 'custom')} className="save-btn">Save Description</button>
                          <button onClick={() => cancelEditSectionDescription(tab.id, 'custom')} className="cancel-btn">Cancel</button>
                        </>
                      ) : (
                        <>
                          <p>{customSections[tab.id]?.description || "No description added for this section."}</p>
                          <button onClick={() => handleEditSectionDescription(tab.id, 'custom', customSections[tab.id]?.description)} className="edit-btn">
                            {customSections[tab.id]?.description ? "Edit Description" : "Add Description"}
                          </button>
                        </>
                      )}
                    </div>

                    <div className="add-content-form">
                      <textarea
                        placeholder={`Add text for ${tab.name}... (Press Enter to add)`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            if (e.target.value.trim()) {
                                handleContentUpload(tab.id, 'custom', 'text', e.target.value);
                                e.target.value = '';
                            }
                          }
                        }}
                      ></textarea>
                      <label htmlFor={`custom-image-upload-${tab.id}`} className="file-input-label">
                        Upload Image
                        <input
                            id={`custom-image-upload-${tab.id}`}
                            type="file"
                            accept="image/*"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        handleContentUpload(tab.id, 'custom', 'image', reader.result, file.name);
                                        e.target.value = '';
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            style={{ display: 'block', width: '100%', border: '1px solid #ddd', borderRadius: '5px', padding: '8px' }}
                        />
                      </label>
                      <label htmlFor={`custom-pdf-upload-${tab.id}`} className="file-input-label">
                        Upload PDF
                        <input
                            id={`custom-pdf-upload-${tab.id}`}
                            type="file"
                            accept="application/pdf"
                            onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                    const reader = new FileReader();
                                    reader.onloadend = () => {
                                        handleContentUpload(tab.id, 'custom', 'pdf', reader.result, file.name);
                                        e.target.value = '';
                                    };
                                    reader.readAsDataURL(file);
                                }
                            }}
                            style={{ display: 'block', width: '100%', border: '1px solid #ddd', borderRadius: '5px', padding: '8px' }}
                        />
                      </label>
                    </div>
                    {customSections[tab.id]?.content.length === 0 ? (
                      <p>No content in this custom section yet.</p>
                    ) : (
                      customSections[tab.id]?.content.map((item, idx) => (
                        <div key={idx} className="section-item">
                          {item.type === "text" && <p>{item.data}</p>}
                          {item.type === "image" && (
                            <div className="media-preview" onClick={() => openImageModal(item.data, item.name)}>
                                <img src={item.data} alt="Uploaded" />
                                <span>{item.name || "Image"}</span>
                            </div>
                          )}
                          {item.type === "pdf" && (
                            <div className="media-preview" onClick={() => openPdfModal(item.data, item.name)}>
                                <span className="pdf-icon">📄</span>
                                <span>{item.name || "PDF Document"}</span>
                            </div>
                          )}
                          <button
                            onClick={() => handleDeleteContentEntry(tab.id, 'custom', idx)}
                            className="delete-entry-btn"
                          >
                            Delete
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                )
            )}
          </div>
        </section>

        {/* Modal for Adding New Dynamic Sections (Research, Student, Custom Tab) */}
        {showSectionModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>
                {modalType === 'customTab' ? "Create New Custom Tab" : `Add New ${modalType === 'researchSection' ? "Research" : "Student"} Section`}
              </h3>
              <input
                type="text"
                placeholder="Enter Section Name"
                value={newDynamicSectionTitle}
                onChange={(e) => setNewDynamicSectionTitle(e.target.value)}
              />
              <input
                type="text"
                placeholder="Enter Subheading (Optional)"
                value={newDynamicSectionSubheading}
                onChange={(e) => setNewDynamicSectionSubheading(e.target.value)}
              />
              <div className="modal-actions">
                <button onClick={handleCreateDynamicSection} className="create-btn">
                  Create
                </button>
                <button
                  onClick={() => setShowSectionModal(false)}
                  className="close-btn"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Image Display Modal */}
        {showImageModal && (
          <div className="modal-overlay" onClick={closeMediaModals}>
            <div className="media-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-media-btn" onClick={closeMediaModals}>&times;</button>
              {currentMediaName && <div className="media-title">{currentMediaName}</div>}
              <img src={currentMediaSrc} alt="Maximized Image" />
              <a href={currentMediaSrc} download={currentMediaName || "image.png"} className="download-media-btn">
                Download Image
              </a>
            </div>
          </div>
        )}

        {/* PDF Display Modal */}
        {showPdfModal && (
          <div className="modal-overlay" onClick={closeMediaModals}>
            <div className="media-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-media-btn" onClick={closeMediaModals}>&times;</button>
              {currentMediaName && <div className="media-title">{currentMediaName}</div>}
              <iframe
                src={currentMediaSrc}
                title="PDF Viewer"
                className="pdf-viewer"
                frameBorder="0"
              ></iframe>
              {/* Added target="_blank" and rel="noopener noreferrer" for robust download */}
              <a href={currentMediaSrc} download={currentMediaName || "document.pdf"} className="download-media-btn" target="_blank" rel="noopener noreferrer">
                Download PDF
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Footer Section */}
      <footer className="amu-footer">
        <div className="footer-container">
          <div className="footer-left">
            <img src="https://amubuddy.com/wp-content/uploads/2023/06/amu-logo.jpg" alt="AMU Logo" className="footer-logo" />
            <p className="footer-text">
              © {new Date().getFullYear()} Aligarh Muslim University. All Rights Reserved.
            </p>
          </div>
          <div className="footer-right">
            <p>Designed and Developed by Faculty of Computer Science</p>
            <p>Contact: info@amu.ac.in</p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default FacultyProfile;
