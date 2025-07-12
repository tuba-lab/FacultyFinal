import React, { useEffect, useState } from "react";

const FacultyPublicView = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [name, setName] = useState("");
  const [qualification, setQualification] = useState("");
  const [email, setEmail] = useState("");
  const [profileDescription, setProfileDescription] = useState("");
  const [researchSections, setResearchSections] = useState([]);
  const [studentSections, setStudentSections] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeTab, setActiveTab] = useState("profile");
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    setProfilePhoto(localStorage.getItem("facultyPhoto"));
    setName(localStorage.getItem("facultyName") || "N/A");
    setQualification(localStorage.getItem("facultyQualification") || "N/A");
    setEmail(localStorage.getItem("facultyEmail") || "N/A");
    setProfileDescription(
      localStorage.getItem("facultyProfileDescription") || ""
    );
    setResearchSections(
      JSON.parse(localStorage.getItem("researchSections")) || []
    );
    setStudentSections(
      JSON.parse(localStorage.getItem("studentSections")) || []
    );
    setPosts(JSON.parse(localStorage.getItem("facultyPosts")) || []);
  }, []);

  const navLinkStyle = {
    color: "#004d40",
    textDecoration: "none",
    fontWeight: "500",
    position: "relative",
    cursor: "pointer",
  };

  const dropdownStyle = {
    position: "absolute",
    top: "100%",
    left: 0,
    background: "#fff",
    border: "1px solid #ccc",
    padding: "10px",
    borderRadius: "6px",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    zIndex: 10,
  };

  return (
    <div
      style={{
        fontFamily: "Segoe UI",
        background: "#f7f9fc",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          padding: "15px 30px",
          background: "#ffffff",
          borderBottom: "4px solid #0d5f4d",
          borderRadius: "0 0 20px 20px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://amubuddy.com/wp-content/uploads/2023/06/amu-logo.jpg"
            alt="AMU Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <h3 style={{ color: "#004d40", margin: 0, fontWeight: "bold" }}>
            ALIGARH MUSLIM UNIVERSITY
          </h3>
        </div>

        <nav style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
          <a href="/" style={navLinkStyle}>
            Home
          </a>
          <a href="/about" style={navLinkStyle}>
            About
          </a>
          <a href="/programs" style={navLinkStyle}>
            Programs
          </a>
          <a href="/faculty" style={navLinkStyle}>
            Faculty
          </a>
          <a href="/contact" style={navLinkStyle}>
            Contact
          </a>
          <div
            style={{ position: "relative" }}
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span style={navLinkStyle}>Links ▾</span>
            {showDropdown && (
              <div style={dropdownStyle}>
                <a
                  href="/useful1"
                  style={{
                    display: "block",
                    marginBottom: "5px",
                    color: "#004d40",
                  }}
                >
                  Useful Link 1
                </a>
                <a
                  href="/useful2"
                  style={{ display: "block", color: "#004d40" }}
                >
                  Useful Link 2
                </a>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Profile Box */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "30px",
          justifyContent: "flex-start",
          padding: "30px",
          background: "#fff",
          margin: "30px auto",
          width: "93%",
          maxWidth: "1100px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          marginTop: "20px",
        }}
      >
        <div style={{ flex: "1 1 160px", maxWidth: "160px" }}>
          <div
            style={{
              width: "100%",
              height: "200px",
              borderRadius: "8px",
              overflow: "hidden",
              background: "#eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {profilePhoto ? (
              <img
                src={profilePhoto}
                alt="Faculty"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <p>No Photo</p>
            )}
          </div>
        </div>
        <div style={{ flex: "2 1 300px" }}>
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
      </div>

      {/* Content Section */}
      <div
        style={{
          background: "#ffffff",
          margin: "30px auto",
          padding: "20px",
          width: "95%",
          maxWidth: "1100px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          border: "1px solid #ccc",
        }}
      >
        {/* Tabs */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "flex-start",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {["profile", "research", "student", "announcement"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                background: activeTab === tab ? "#004d40" : "white",
                color: activeTab === tab ? "white" : "#004d40",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === "profile" && (
          <div>
            <h3 style={{ color: "#004d40" }}>Profile Description</h3>
            <div
              style={{
                background: "#f1f1f1",
                padding: "15px",
                borderRadius: "10px",
                whiteSpace: "pre-line",
              }}
            >
              {profileDescription || "No description added."}
            </div>
          </div>
        )}

        {activeTab === "research" && (
          <div>
            <h3 style={{ color: "#004d40" }}>Research</h3>
            {researchSections.map((section) => (
              <div
                key={section.id}
                style={{
                  background: "#f9f9f9",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              >
                <h4>{section.title}</h4>
                {section.content.length === 0 ? (
                  <p>No content</p>
                ) : (
                  <ul>
                    {section.content.map((item, idx) => (
                      <li key={idx}>
                        {item.type === "message" && <p>{item.data}</p>}
                        {item.type === "image" && (
                          <img
                            src={item.data}
                            alt=""
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        )}
                        {item.type === "pdf" && (
                          <a href={item.data} target="_blank" rel="noreferrer">
                            View PDF
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "student" && (
          <div>
            <h3 style={{ color: "#004d40" }}>Student</h3>
            {studentSections.map((section) => (
              <div
                key={section.id}
                style={{
                  background: "#f9f9f9",
                  padding: "15px",
                  borderRadius: "10px",
                  marginBottom: "15px",
                }}
              >
                <h4>{section.title}</h4>
                {section.content.length === 0 ? (
                  <p>No content</p>
                ) : (
                  <ul>
                    {section.content.map((item, idx) => (
                      <li key={idx}>
                        {item.type === "message" && <p>{item.data}</p>}
                        {item.type === "image" && (
                          <img
                            src={item.data}
                            alt=""
                            style={{ maxWidth: "100%", height: "auto" }}
                          />
                        )}
                        {item.type === "pdf" && (
                          <a href={item.data} target="_blank" rel="noreferrer">
                            View PDF
                          </a>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === "announcement" && (
          <div>
            <h3 style={{ color: "#004d40" }}>Announcements</h3>
            {posts.length === 0 ? (
              <p>No announcements available.</p>
            ) : (
              <ul style={{ listStyle: "none", padding: 0 }}>
                {posts.map((p) => (
                  <li
                    key={p.id}
                    style={{
                      background:
                        p.type === "Announcement" ? "#fff9c4" : "#e0f7fa",
                      padding: "10px 15px",
                      borderRadius: "8px",
                      marginBottom: "10px",
                      border: "1px solid #ccc",
                    }}
                  >
                    <strong>{p.type}:</strong> {p.content}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer
        style={{
          background: "#ffffff",

          color: "#004d40",
          padding: "20px 30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          fontSize: "14px",
          marginTop: "30px",
          borderRadius: "20px 20px 0 0",
          boxShadow: "0 -2px 4px rgba(0,0,0,0.05)",
        }}
      >
        <div style={{ lineHeight: "1.6" }}>
          <p style={{ margin: 0 }}>Aligarh – 202002, Uttar Pradesh, India</p>
          <p style={{ margin: 0 }}>Email: info@amu.ac.in</p>
        </div>
        <div>
          <p style={{ margin: 0 }}>
            © {new Date().getFullYear()} Aligarh Muslim University. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default FacultyPublicView;
