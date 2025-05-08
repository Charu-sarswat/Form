import React, { useState } from "react";
import "./index.css";
import olxAvatar from './assets/olx-avatar.png';
import Select from 'react-select';

function InputWithCheck({ value, onChange, as = "input", maxLength, showCounter, ...props }) {
  const length = value ? value.length : 0;
  return (
    <div className="input-wrapper" style={{ position: "relative" }}>
      {as === "textarea" ? (
        <textarea value={value} onChange={onChange} maxLength={maxLength} {...props} />
      ) : (
        <input value={value} onChange={onChange} maxLength={maxLength} {...props} />
      )}
      {value && <span className="input-checkmark">&#10003;</span>}
      {showCounter && (
        <span className="input-counter">
          {length} / {maxLength}
        </span>
      )}
    </div>
  );
}

function ButtonGroup({ options, value, onChange }) {
  return (
    <div className="btn-group">
      {options.map((opt) => (
        <button
          key={opt}
          type="button"
          className={value === opt ? "selected" : ""}
          onClick={() => onChange(opt)}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function App() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showWebView, setShowWebView] = useState(false);
  // State for all fields
  const [type, setType] = useState("");
  const [bhk, setBhk] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [furnishing, setFurnishing] = useState("");
  const [propertyStatus, setPropertyStatus] = useState("");
  const [listedBy, setListedBy] = useState("");
  const [superBuiltup, setSuperBuiltup] = useState("");
  const [carpetArea, setCarpetArea] = useState("");
  const [maintenance, setMaintenance] = useState("");
  const [totalFloors, setTotalFloors] = useState("");
  const [floorNo, setFloorNo] = useState("");
  const [carParking, setCarParking] = useState("");
  const [facing, setFacing] = useState("");
  const [projectName, setProjectName] = useState("");
  const [adTitle, setAdTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [reviewName, setReviewName] = useState("OLX User");
  const [photos, setPhotos] = useState(Array(12).fill(null));
  const [locationTab, setLocationTab] = useState("LIST");
  const [state, setState] = useState("Uttar Pradesh");
  const [city, setCity] = useState("Ghaziabad");
  const [neighbourhood, setNeighbourhood] = useState("Garhi");

  // Add this array for Indian states
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Andaman and Nicobar Islands", "Chandigarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi", "Jammu and Kashmir", "Ladakh", "Lakshadweep", "Puducherry"
  ];

  const formIsValid =
    type &&
    bhk &&
    bathrooms &&
    furnishing &&
    propertyStatus &&
    listedBy &&
    superBuiltup &&
    carpetArea &&
    projectName &&
    adTitle &&
    description &&
    price &&
    reviewName;

  function handlePhotoChange(e, idx) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const newPhotos = [...photos];
        newPhotos[idx] = ev.target.result;
        setPhotos(newPhotos);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (formIsValid) {
      setLoading(true);
      setTimeout(() => {
        setSubmitted(true);
        setLoading(false);
      }, 4000);
    }
  }

  function fetchUserLocation() {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Use Nominatim for reverse geocoding
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(res => res.json())
          .then(data => {
            // Nominatim address fields: state, city, town, village, suburb, neighbourhood
            setState(data.address.state || "");
            setCity(data.address.city || data.address.town || data.address.village || "");
            setNeighbourhood(data.address.suburb || data.address.neighbourhood || "");
          })
          .catch(() => {
            alert("Failed to fetch location details.");
          });
      },
      () => {
        alert("Unable to retrieve your location");
      }
    );
  }

  const facingOptions = [
    { value: 'East', label: 'East' },
    { value: 'North', label: 'North' },
    { value: 'North-East', label: 'North-East' },
    { value: 'North-West', label: 'North-West' },
    { value: 'South', label: 'South' },
    { value: 'South-East', label: 'South-East' },
    { value: 'South-West', label: 'South-West' },
    { value: 'West', label: 'West' },
  ];

  return (
    <div className="main-bg">
      <div className="form-container">
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <h2 style={{ color: "#00c3ca", marginBottom: 16 }}>Submitting...</h2>
          </div>
        ) : submitted ? (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <h2 style={{ color: "#00c3ca", marginBottom: 16 }}>Congratulations!</h2>
            <p style={{ fontSize: 18, marginBottom: 12 }}>
              Your Ad will go live shortly...
            </p>
            <p style={{ color: "#888", fontSize: 15 }}>
              OLX allows 1 free ad in 120 days for Properties
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <h2 className="form-title">POST YOUR AD</h2>
            <div className="form-section">
              <div className="section-title">SELECTED CATEGORY</div>
              <div className="category-path">
                Properties / For Sale: Houses & Apartments
                <span className="change-link">Change</span>
              </div>
            </div>
            <div className="form-section">
              <div className="section-title">INCLUDE SOME DETAILS</div>
              <div className="form-group">
                <label>Type:</label>
                <ButtonGroup
                  options={[
                    "Flat / Apartments",
                    "Independent / Builder Floors",
                    "FarmHouse",
                    "House & Villa",
                  ]}
                  value={type}
                  onChange={setType}
                />
              </div>
              <div className="form-group">
                <label>BHK:</label>
                <ButtonGroup
                  options={["1", "2", "3", "4", "4+"]}
                  value={bhk}
                  onChange={setBhk}
                />
              </div>
              <div className="form-group">
                <label>Bathrooms:</label>
                <ButtonGroup
                  options={["1", "2", "3", "4", "4+"]}
                  value={bathrooms}
                  onChange={setBathrooms}
                />
              </div>
              <div className="form-group">
                <label>Furnishing:</label>
                <ButtonGroup
                  options={["Furnished", "Semi-Furnished", "Unfurnished"]}
                  value={furnishing}
                  onChange={setFurnishing}
                />
              </div>
              <div className="form-group">
                <label>Property Status:</label>
                <ButtonGroup
                  options={["New Launch", "Ready to Move", "Under Construction"]}
                  value={propertyStatus}
                  onChange={setPropertyStatus}
                />
              </div>
              <div className="form-group">
                <label>Listed by:</label>
                <ButtonGroup
                  options={["Builder", "Dealer", "Owner"]}
                  value={listedBy}
                  onChange={setListedBy}
                />
              </div>
              <div className="form-group">
                <label>Super Builtup area (sqft)*</label>
                <InputWithCheck
                  value={superBuiltup}
                  onChange={e => setSuperBuiltup(e.target.value)}
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>Carpet Area (sqft)*</label>
                <InputWithCheck
                  value={carpetArea}
                  onChange={e => setCarpetArea(e.target.value)}
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>Maintenance (Monthly)</label>
                <InputWithCheck
                  value={maintenance}
                  onChange={e => setMaintenance(e.target.value)}
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>Total Floors</label>
                <InputWithCheck
                  value={totalFloors}
                  onChange={e => setTotalFloors(e.target.value)}
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>Floor No</label>
                <InputWithCheck
                  value={floorNo}
                  onChange={e => setFloorNo(e.target.value)}
                  type="text"
                />
              </div>
              <div className="form-group">
                <label>Car Parking</label>
                <ButtonGroup
                  options={["0", "1", "2", "3", "3+"]}
                  value={carParking}
                  onChange={setCarParking}
                />
              </div>
              <div className="form-group" style={{ position: "relative" }}>
                <label>Facing</label>
                <Select
                  options={facingOptions}
                  value={facingOptions.find(opt => opt.value === facing)}
                  onChange={opt => setFacing(opt.value)}
                  placeholder="--Select--"
                  styles={{
                    control: (base, state) => ({
                      ...base,
                      borderColor: state.isFocused ? '#1976d2' : base.borderColor,
                      boxShadow: state.isFocused ? '0 0 0 1px #1976d2' : base.boxShadow,
                    }),
                    option: (base, state) => ({
                      ...base,
                      backgroundColor: state.isSelected
                        ? '#1976d2'
                        : state.isFocused
                          ? '#e3f2fd'
                          : base.backgroundColor,
                      color: state.isSelected ? '#fff' : '#222',
                    }),
                  }}
                />
              </div>
              <div className="form-group">
                <label>Project Name</label>
                <InputWithCheck
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  type="text"
                  maxLength={70}
                  showCounter
                />
              </div>
              <div className="form-group">
                <label style={{ color: adTitle && adTitle.length < 10 ? "#ff3a1e" : undefined }}>
                  Ad title *
                </label>
                <InputWithCheck
                  value={adTitle}
                  onChange={e => setAdTitle(e.target.value)}
                  type="text"
                  maxLength={70}
                  showCounter
                  style={{
                    borderColor: adTitle && adTitle.length < 10 ? "#ff3a1e" : undefined
                  }}
                />
                {adTitle && adTitle.length < 10 && (
                  <div className="error-text" style={{ color: "#ff3a1e", fontSize: 13 }}>
                    A minimum length of 10 characters is required. Please edit the field.
                  </div>
                )}
                <div className="hint">Mention key features (e.g. BHK, floor, area, price)</div>
              </div>
              <div className="form-group">
                <label>Description*</label>
                <InputWithCheck
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  as="textarea"
                  maxLength={4096}
                  showCounter
                />
                <div className="hint">Include amenities, features, etc.</div>
              </div>
            </div>
            <div className="form-section">
              <div className="section-title">SET A PRICE</div>
              <InputWithCheck
                value={price}
                onChange={e => setPrice(e.target.value)}
                type="text"
                className="price-input"
              />
            </div>
            <div className="form-section">
              <div className="section-title">UPLOAD UP TO 20 PHOTOS</div>
              <div className="photo-grid">
                {photos.map((photo, i) => (
                  <label className="photo-box" key={i} style={{ cursor: "pointer" }}>
                    {photo ? (
                      <img
                        src={photo}
                        alt={`upload-${i}`}
                        style={{ width: "80%", height: "80%", objectFit: "cover", borderRadius: 3 }}
                      />
                    ) : (
                      <>
                        <span className="photo-icon" role="img" aria-label="camera">📷</span>
                        <span className="photo-label">{i === 0 ? "Add Photo" : ""}</span>
                      </>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={e => handlePhotoChange(e, i)}
                    />
                  </label>
                ))}
              </div>
              <div className="error-text">*This field is mandatory</div>
            </div>
            <div className="form-section">
              <div className="section-title">CONFIRM YOUR LOCATION</div>
              <div className="location-tabs">
                <button
                  className={locationTab === "LIST" ? "active" : ""}
                  onClick={() => setLocationTab("LIST")}
                  type="button"
                >
                  LIST
                </button>
                <button
                  className={locationTab === "CURRENT LOCATION" ? "active" : ""}
                  onClick={() => {
                    setLocationTab("CURRENT LOCATION");
                    fetchUserLocation();
                  }}
                  type="button"
                >
                  CURRENT LOCATION
                </button>
              </div>
              {locationTab === "LIST" ? (
                <>
                  <select
                    className="location-select"
                    value={state}
                    onChange={e => {
                      setState(e.target.value);
                      setCity("");
                      setNeighbourhood("");
                    }}
                  >
                    <option value="">Select State</option>
                    {indianStates.map((st) => (
                      <option key={st} value={st}>{st}</option>
                    ))}
                  </select>
                  <div className="error-text">*This field is mandatory</div>
                </>
              ) : (
                <div className="location-details-table">
                  <div className="location-row">
                    <span className="location-label">State</span>
                    <span className="location-value">{state}</span>
                  </div>
                  <div className="location-row">
                    <span className="location-label">City</span>
                    <span className="location-value">{city}</span>
                  </div>
                  <div className="location-row">
                    <span className="location-label">Neighbourhood</span>
                    <span className="location-value">{neighbourhood}</span>
                  </div>
                </div>
              )}
            </div>
            <div className="form-section">
              <div className="section-title">REVIEW YOUR DETAILS</div>
              <div className="review-details">
                <div className="avatar">
                  <img
                    src={olxAvatar}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block"
                    }}
                  />
                </div>
                <div style={{ width: "100%" }}>
                  <div className="form-group" style={{ marginBottom: 0 }}>
                    <label>Name</label>
                    <div className="input-wrapper" style={{ marginBottom: 0 }}>
                      <input
                        type="text"
                        value={reviewName}
                        onChange={e => setReviewName(e.target.value)}
                        maxLength={30}
                        style={{ width: "100%" }}
                      />
                      {reviewName && <span className="input-checkmark">&#10003;</span>}
                      <span className="input-counter" style={{ right: 0, bottom: -10 }}>
                        {reviewName.length} / 30
                      </span>
                    </div>
                  </div>
                  <div className="phone-number" style={{ marginTop: 8 }}>
                    Your phone number <span style={{ float: "right" }}>+91 1234567890</span>
                  </div>
                </div>
              </div>
            </div>
            <hr className="form-divider" />
            <button
              className="post-btn"
              type="submit"
              disabled={!formIsValid}
            >
              Post now
            </button>
          </form>
        )}
      </div>
      {showWebView && (
        <div style={{
          width: "100%",
          height: "500px",
          margin: "20px 0",
          border: "1px solid #ddd",
          borderRadius: "4px",
          overflow: "hidden"
        }}>
          <iframe
            src="https://form-c.netlify.app/"
            width="100%"
            height="100%"
            id="form-webview"
            className="webview-frame"
            style={{
              border: "none",
              display: "block"
            }}
            title="Form WebView"
            allowFullScreen
          />
        </div>
      )}
    </div>
  );
}

export default App;
