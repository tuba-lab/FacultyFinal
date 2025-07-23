import React, { useEffect, useState } from "react";

const FacultyPublicView = () => {
  // --- Profile Information States ---
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [email, setEmail] = useState("");

  // --- Profile Description States (Now an array of sections) ---
  const [profileDescriptionSections, setProfileDescriptionSections] = useState([]);

  // --- Research and Student Sections States ---
  const [researchSections, setResearchSections] = useState([]);
  const [studentSections, setStudentSections] = useState([]);

  // --- Posts/Announcements States ---
  const [posts, setPosts] = useState([]);

  // --- Custom Tabs States ---
  const [customTabs, setCustomTabs] = useState([]);
  const [customSections, setCustomSections] = useState({}); // To store content for custom tabs

  // --- Active Tab State ---
  const [activeTab, setActiveTab] = useState("profile"); // Default active tab

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

  // --- Media Viewer Modals ---
  const [showImageModal, setShowImageModal] = useState(false);
  const [showPdfModal, setShowPdfModal] = useState(false);
  const [currentMediaSrc, setCurrentMediaSrc] = useState(null);
  const [currentMediaName, setCurrentMediaName] = useState("");


  // --- Load Data from Local Storage on Mount ---
  useEffect(() => {
    setProfilePhoto(localStorage.getItem("facultyPhoto"));
    setName(localStorage.getItem("facultyName") || "N/A");
    setQualification(localStorage.getItem("facultyQualification") || "N/A");
    setEmail(localStorage.getItem("facultyEmail") || "N/A");

    // Parse array data from localStorage
    setProfileDescriptionSections(
      JSON.parse(localStorage.getItem("facultyProfileDescriptionSections")) || []
    );
    setResearchSections(
      JSON.parse(localStorage.getItem("researchSections")) || []
    );
    setStudentSections(
      JSON.parse(localStorage.getItem("studentSections")) || []
    );
    setPosts(JSON.parse(localStorage.getItem("facultyPosts")) || []);
    setCustomTabs(JSON.parse(localStorage.getItem("customTabs")) || []);
    setCustomSections(JSON.parse(localStorage.getItem("customSections")) || {});
  }, []);

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


  const navLinkStyle = {
    color: "#004d40",
    textDecoration: "none",
    fontWeight: "600",
    cursor: "pointer",
    transition: "color 0.2s ease-in-out",
  };

  const dropdownStyle = {
    position: "absolute",
    background: "white",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
    padding: "10px",
    top: "100%",
    right: 0, // Align to the right of "Links"
    zIndex: 999,
    minWidth: "250px",
    display: "flex",
    flexDirection: "column",
    gap: "5px",
  };

  const dropdownItemStyle = {
    display: "block",
    padding: "8px",
    color: "#004d40",
    textDecoration: "none",
    fontSize: "14px",
    transition: "background-color 0.2s ease-in-out",
  };

  const dropdownItemHoverStyle = {
    backgroundColor: "#e0f2f1",
    borderRadius: "4px",
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
        }

        .photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
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

        .tabs-section {
          background: #fff;
          margin-top: 30px;
          padding: 20px;
          border-radius: 12px;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .tabs {
          display: flex;
          gap: 8px;
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
          white-space: nowrap;
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
          margin-bottom: 15px;
          border-bottom: 2px solid #e0f2f1;
          padding-bottom: 8px;
        }

        .profile-description-item {
            background: #f9f9f9;
            border: 1px solid #eee;
            border-radius: 8px;
            padding: 15px;
            margin-bottom: 10px;
            white-space: pre-line;
            color: #444;
            line-height: 1.5;
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
        }
        .section-block h5 {
          margin-top: -5px;
          margin-bottom: 15px;
          color: #555;
          font-weight: normal;
          font-size: 0.95em;
        }

        .section-description-area {
            margin-bottom: 15px;
            padding: 12px;
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

        .section-item {
          background: #f9f9f9;
          border: 1px solid #eee;
          border-radius: 8px;
          padding: 15px;
          margin-bottom: 10px;
          display: flex;
          align-items: center;
          gap: 15px;
          flex-wrap: wrap;
        }
        .section-item p {
          margin: 0;
          font-size: 0.95em;
          color: #333;
          flex: 1;
          min-width: 150px;
          white-space: pre-line;
        }
        .section-item .media-preview {
          display: flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          color: #004d40;
          font-weight: 500;
          flex: 1;
          min-width: 150px;
        }
        .section-item .media-preview:hover {
          text-decoration: underline;
        }
        .section-item .media-preview img {
          width: 50px;
          height: 50px;
          object-fit: cover;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        .section-item .media-preview .pdf-icon {
          font-size: 30px;
          color: #dc3545;
        }
        .section-item a {
          color: #004d40;
          text-decoration: none;
          font-weight: 500;
        }
        .section-item a:hover {
          text-decoration: underline;
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
          white-space: pre-line;
        }
        .post-item small {
          color: #777;
          font-size: 0.85em;
          display: block;
          margin-bottom: 5px;
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
        }

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
        .media-modal-content .download-media-btn {
            margin-top: 15px;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            text-decoration: none;
            font-size: 1em;
            display: inline-block;
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
            width: 100%;
          }
          .amu-nav a, .dropdown-toggle {
            width: 100%;
            text-align: left;
          }

          .dropdown-wrapper {
            width: 100%;
          }
          .dropdown-menu {
            position: static;
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
            min-width: unset;
            width: 100%;
          }

          .tabs {
            flex-direction: column;
            align-items: flex-start;
          }
          .tab {
            width: 100%;
            text-align: left;
          }
          .section-item {
            flex-direction: column;
            align-items: stretch;
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
            <a href="#" style={navLinkStyle}>Home</a>
            <a href="#" style={navLinkStyle}>About</a>
            <a href="#" style={navLinkStyle}>Programs</a>
            <a href="#" style={navLinkStyle}>Faculty</a>
            <a href="#" style={navLinkStyle}>Contact</a>
            <div className="dropdown-wrapper">
              <span
                className="dropdown-toggle"
                onClick={() => setShowDropdown(!showDropdown)}
                style={navLinkStyle}
              >
                Links ▼
              </span>
              {showDropdown && (
                <div className="dropdown-menu" style={dropdownStyle}>
                  {dropdownItems.map((item) => (
                    <a
                      href="#"
                      key={item.key}
                      style={dropdownItemStyle}
                      onMouseEnter={(e) => Object.assign(e.target.style, dropdownItemHoverStyle)}
                      onMouseLeave={(e) => Object.assign(e.target.style, { backgroundColor: 'transparent', borderRadius: '0' })}
                    >
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
          <div className="photo">
            {profilePhoto ? (
              <img src={profilePhoto} alt="Faculty Profile" />
            ) : (
              <span>No Photo Available</span>
            )}
          </div>

          <div className="info">
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Qualification:</strong> {qualification}
            </p>
            <p>
              <strong>Email:</strong> {email}
            </p>
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
              </button>
            ))}
          </div>

          <div className="tab-content">
            {/* Profile Description Tab */}
            {activeTab === "profile" && (
              <div>
                <h3>Profile Description</h3>
                {profileDescriptionSections.length === 0 ? (
                  <p>No profile description areas available.</p>
                ) : (
                  profileDescriptionSections.map((section) => (
                    <div key={section.id} className="profile-description-item">
                      <p>{section.content || "No description content."}</p>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Research Tab */}
            {activeTab === "research" && (
              <div>
                <h3>Research</h3>
                {researchSections.length === 0 ? (
                  <p>No research sections available.</p>
                ) : (
                  researchSections.map((section) => (
                    <div key={section.id} className="section-block">
                      <h4>{section.title}</h4>
                      {section.subheading && <h5>{section.subheading}</h5>}
                      <div className="section-description-area">
                        <p>{section.description || "No description added for this section."}</p>
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
                          </div>
                        ))
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Students Tab */}
            {activeTab === "students" && (
              <div>
                <h3>Students</h3>
                {studentSections.length === 0 ? (
                  <p>No student sections available.</p>
                ) : (
                  studentSections.map((section) => (
                    <div key={section.id} className="section-block">
                      <h4>{section.title}</h4>
                      {section.subheading && <h5>{section.subheading}</h5>}
                      <div className="section-description-area">
                        <p>{section.description || "No description added for this section."}</p>
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
                          </div>
                        ))
                      )}
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Posts Tab */}
            {activeTab === "posts" && (
              <div>
                <h3>Announcements / Posts</h3>
                {posts.length === 0 ? (
                  <p>No posts available.</p>
                ) : (
                  <div className="posts-list">
                    {posts.map((post) => (
                      <div key={post.id} className="post-item">
                        <small>{post.timestamp}</small>
                        <p>
                          <strong>[{post.type}]</strong> {post.content}
                        </p>
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
                    <div className="section-description-area">
                      <p>{customSections[tab.id]?.description || "No description added for this section."}</p>
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
                        </div>
                      ))
                    )}
                  </div>
                )
            )}
          </div>
        </section>

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

export default FacultyPublicView;
