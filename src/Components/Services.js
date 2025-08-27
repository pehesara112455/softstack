import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  getDocs, 
  query, 
  where,
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from './firebase'; // Your Firebase configuration
import './Services.css';

const Services = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image1: null,
    image2: null,
    image3: null
  });
  const [uploadProgress, setUploadProgress] = useState({});
  const [loading, setLoading] = useState(false);

  // Fetch services from Firebase
  useEffect(() => {
    fetchServices();
  }, []);

  // Filter services based on search term
  useEffect(() => {
    const filtered = services.filter(service => 
      service.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(filtered);
  }, [searchTerm, services]);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const servicesCollection = collection(db, 'services');
      const servicesSnapshot = await getDocs(query(servicesCollection, orderBy('title')));
      const servicesList = servicesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setServices(servicesList);
      setFilteredServices(servicesList);
    } catch (error) {
      console.error('Error fetching services:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e, imageField) => {
    if (e.target.files[0]) {
      setFormData(prev => ({
        ...prev,
        [imageField]: e.target.files[0]
      }));
    }
  };

  const uploadImage = async (imageFile, path) => {
    if (!imageFile) return null;
    
    const imageRef = ref(storage, `${path}/${Date.now()}_${imageFile.name}`);
    await uploadBytes(imageRef, imageFile);
    return await getDownloadURL(imageRef);
  };

  const deleteImage = async (imageUrl) => {
    if (!imageUrl) return;
    
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let image1Url = formData.image1Url || '';
      let image2Url = formData.image2Url || '';
      let image3Url = formData.image3Url || '';

      // Upload new images if provided
      if (formData.image1 && typeof formData.image1 !== 'string') {
        image1Url = await uploadImage(formData.image1, 'services/images');
      }
      if (formData.image2 && typeof formData.image2 !== 'string') {
        image2Url = await uploadImage(formData.image2, 'services/images');
      }
      if (formData.image3 && typeof formData.image3 !== 'string') {
        image3Url = await uploadImage(formData.image3, 'services/images');
      }

      const serviceData = {
        title: formData.title,
        description: formData.description,
        image1: image1Url,
        image2: image2Url,
        image3: image3Url,
        updatedAt: new Date()
      };

      if (editingService) {
        // Update existing service
        const serviceRef = doc(db, 'services', editingService.id);
        await updateDoc(serviceRef, serviceData);
      } else {
        // Add new service
        serviceData.createdAt = new Date();
        await addDoc(collection(db, 'services'), serviceData);
      }

      // Reset form and close modal
      setFormData({
        title: '',
        description: '',
        image1: null,
        image2: null,
        image3: null
      });
      setEditingService(null);
      setShowModal(false);
      fetchServices(); // Refresh the list
    } catch (error) {
      console.error('Error saving service:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      image1: service.image1 || null,
      image2: service.image2 || null,
      image3: service.image3 || null,
      image1Url: service.image1,
      image2Url: service.image2,
      image3Url: service.image3
    });
    setShowModal(true);
  };

  const handleDelete = async (service) => {
    if (window.confirm(`Are you sure you want to delete "${service.title}"?`)) {
      try {
        // Delete images from storage
        if (service.image1) await deleteImage(service.image1);
        if (service.image2) await deleteImage(service.image2);
        if (service.image3) await deleteImage(service.image3);
        
        // Delete document from Firestore
        await deleteDoc(doc(db, 'services', service.id));
        fetchServices(); // Refresh the list
      } catch (error) {
        console.error('Error deleting service:', error);
      }
    }
  };

  const handleClear = () => {
    setFormData({
      title: '',
      description: '',
      image1: null,
      image2: null,
      image3: null
    });
    setEditingService(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingService(null);
    handleClear();
  };

  return (
    <div className="services-container">
      <div className="services-header">
        <h2>Service Management</h2>
        <div className="services-actions">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search services..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Add New Service
          </button>
        </div>
      </div>

      {loading && !showModal ? (
        <div className="loading">Loading services...</div>
      ) : (
        <div className="services-table-container">
          <table className="services-table">
            <thead>
              <tr>
                <th>Service Title</th>
                <th>Description</th>
                <th>Image 1</th>
                <th>Image 2</th>
                <th>Image 3</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length > 0 ? (
                filteredServices.map(service => (
                  <tr key={service.id}>
                    <td>{service.title}</td>
                    <td className="description-cell">
                      {service.description.length > 100 
                        ? `${service.description.substring(0, 100)}...` 
                        : service.description
                      }
                    </td>
                    <td>
                      {service.image1 && (
                        <img src={service.image1} alt="Service" className="thumbnail" />
                      )}
                    </td>
                    <td>
                      {service.image2 && (
                        <img src={service.image2} alt="Service" className="thumbnail" />
                      )}
                    </td>
                    <td>
                      {service.image3 && (
                        <img src={service.image3} alt="Service" className="thumbnail" />
                      )}
                    </td>
                    <td>
                      <div className="action-buttons">
                        <button 
                          className="btn btn-edit"
                          onClick={() => handleEdit(service)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-delete"
                          onClick={() => handleDelete(service)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="no-data">
                    No services found. {searchTerm && 'Try a different search term.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h3>{editingService ? 'Edit Service' : 'Add New Service'}</h3>
              <button className="close-btn" onClick={handleCloseModal}>×</button>
            </div>
            <form onSubmit={handleSubmit} className="service-form">
              <div className="form-group">
                <label>Service Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  required
                />
              </div>
              
              <div className="form-group">
                <label>Image 1</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'image1')}
                />
                {formData.image1 && typeof formData.image1 === 'string' && (
                  <img src={formData.image1} alt="Preview" className="image-preview" />
                )}
              </div>
              
              <div className="form-group">
                <label>Image 2</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'image2')}
                />
                {formData.image2 && typeof formData.image2 === 'string' && (
                  <img src={formData.image2} alt="Preview" className="image-preview" />
                )}
              </div>
              
              <div className="form-group">
                <label>Image 3</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, 'image3')}
                />
                {formData.image3 && typeof formData.image3 === 'string' && (
                  <img src={formData.image3} alt="Preview" className="image-preview" />
                )}
              </div>
              
              <div className="form-actions">
                <button 
                  type="button" 
                  className="btn btn-secondary"
                  onClick={handleClear}
                >
                  Clear
                </button>
                <button 
                  type="submit" 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : (editingService ? 'Update' : 'Submit')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;