import React, { useState, useEffect } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import '../../Styles/Adminstyles/Blogs.css';
import AdminNav from './AdminNav';

const Blog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // Default filter
  const [showForm, setShowForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  
  // Form state
  const [title, setTitle] = useState('');
  const [subTitle, setSubTitle] = useState('');
  const [paragraph1, setParagraph1] = useState('');
  const [paragraph2, setParagraph2] = useState('');
  const [paragraph3, setParagraph3] = useState('');
  const [thumbnail, setThumbnail] = useState(null);
  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);
  const [image5, setImage5] = useState(null);
  const [status, setStatus] = useState('draft');

  useEffect(() => {
    const q = query(collection(db, 'blogs'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const blogsData = [];
      querySnapshot.forEach((doc) => {
        blogsData.push({ id: doc.id, ...doc.data() });
      });
      setBlogs(blogsData);
    });

    return () => unsubscribe();
  }, []);

  // Filter and search blogs
  useEffect(() => {
    let result = blogs;
    
    // Apply status filter
    if (statusFilter === 'upcoming') {
      result = result.filter(blog => blog.status === 'upcoming' || blog.status === 'draft');
    } else if (statusFilter === 'completed') {
      result = result.filter(blog => blog.status === 'completed');
    }
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(blog => 
        blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.subTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.id.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredBlogs(result);
  }, [blogs, statusFilter, searchTerm]);

  // Handle image upload to Firebase Storage
  const uploadImage = async (imageFile, path) => {
    if (!imageFile) return null;
    
    const storageRef = ref(storage, `blog-images/${path}/${Date.now()}_${imageFile.name}`);
    await uploadBytes(storageRef, imageFile);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Upload images
      const thumbnailURL = await uploadImage(thumbnail, 'thumbnails');
      const image1URL = await uploadImage(image1, 'images');
      const image2URL = await uploadImage(image2, 'images');
      const image3URL = await uploadImage(image3, 'images');
      const image4URL = await uploadImage(image4, 'images');
      const image5URL = await uploadImage(image5, 'images');

      const blogData = {
        title,
        subTitle,
        paragraph1,
        paragraph2: paragraph2 || '',
        paragraph3: paragraph3 || '',
        thumbnail: thumbnailURL,
        images: [
          image1URL,
          image2URL,
          image3URL,
          image4URL,
          image5URL
        ].filter(url => url !== null),
        status,
        createdAt: editingBlog ? editingBlog.createdAt : new Date(),
        updatedAt: new Date()
      };

      if (editingBlog) {
        // Update existing blog
        const blogRef = doc(db, 'blogs', editingBlog.id);
        await updateDoc(blogRef, blogData);
      } else {
        // Add new blog
        await addDoc(collection(db, 'blogs'), blogData);
      }

      // Reset form
      resetForm();
      setShowForm(false);
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setLoading(false);
    }
  };

  // Edit blog
  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setTitle(blog.title);
    setSubTitle(blog.subTitle);
    setParagraph1(blog.paragraph1);
    setParagraph2(blog.paragraph2);
    setParagraph3(blog.paragraph3);
    setStatus(blog.status);
    setShowForm(true);
  };

  // Update blog status
  const handleStatusChange = async (blogId, newStatus) => {
    try {
      const blogRef = doc(db, 'blogs', blogId);
      await updateDoc(blogRef, { 
        status: newStatus,
        updatedAt: new Date()
      });
    } catch (error) {
      console.error('Error updating blog status:', error);
    }
  };

  // Delete blog
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      try {
        await deleteDoc(doc(db, 'blogs', id));
      } catch (error) {
        console.error('Error deleting blog:', error);
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setTitle('');
    setSubTitle('');
    setParagraph1('');
    setParagraph2('');
    setParagraph3('');
    setThumbnail(null);
    setImage1(null);
    setImage2(null);
    setImage3(null);
    setImage4(null);
    setImage5(null);
    setStatus('draft');
    setEditingBlog(null);
  };

  // Close form
  const handleCloseForm = () => {
    setShowForm(false);
    resetForm();
  };

  return (
    <div className="blog-management">
          <AdminNav/>
          <div className='bbb'>
            <div className="blog-header">
        <h2>BLOG POSTS</h2>
       
        <div className='Filter-and-search'>
          <select 
            className='status-filter'
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="completed">Completed</option>
          </select>
          
          <input 
            className='Search-box'
            type="text"
            placeholder="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button 
            className="addbutton"
            onClick={() => setShowForm(true)}
          >
            ADD NEW
          </button>
        </div>
      </div>
      <div className="blog-table-container">
        <table className="blog-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Sub Title</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBlogs.length > 0 ? (
              filteredBlogs.map(blog => (
                <tr key={blog.id}>
                  <td>{blog.id.substring(0, 8)}...</td>
                  <td>{blog.title}</td>
                  <td>{blog.subTitle}</td>
                  <td>
                    <span className={`status-badge ${blog.status}`}>
                      {blog.status}
                    </span>
                  </td>
                  <td>
                    <button 
                      className="edit-btn"
                      title="Edit"
                      onClick={() => handleEdit(blog)}
                    >
                      ✏
                    </button>
                    <button 
                      className="delete-btn"
                      title="Delete"
                      onClick={() => handleDelete(blog.id)}
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="no-data">
                  No blogs found with the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

          </div>

      

      
      {showForm && (
        <div className="modal-overlay">
          <div className="blog-form-modal">
            <div className="modal-header">
              <h3>{editingBlog ? 'EDIT BLOG' : 'ADD NEW BLOG'}</h3>
              <button
  className="close-btn"
  type="button"
  onClick={handleCloseForm}
  style={{
    position: 'absolute',
    top: '12px',
    right: '18px',
    fontSize: '22px',
    background: 'none',
    border: 'none',
    cursor: 'pointer'
  }}
  aria-label="Close"
>
  ×
</button>
            </div>
            
            <form onSubmit={handleSubmit} className="blog-form">
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-row">
                <input
                  type="text"
                  placeholder="Sub Title"
                  value={subTitle}
                  onChange={(e) => setSubTitle(e.target.value)}
                  required
                />
              </div>
              
              <div className="form-row">
                <textarea
                  placeholder="Paragraph 1"
                  value={paragraph1}
                  onChange={(e) => setParagraph1(e.target.value)}
                  required
                ></textarea>
              </div>
              
              <div className="form-row">
                <textarea
                  placeholder="Paragraph 2"
                  value={paragraph2}
                  onChange={(e) => setParagraph2(e.target.value)}
                ></textarea>
              </div>
              
              <div className="form-row">
                <textarea
                  placeholder="Paragraph 3"
                  value={paragraph3}
                  onChange={(e) => setParagraph3(e.target.value)}
                ></textarea>
              </div>
              
              <div className="form-row">
                <label>Thumbnail</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </div>
              
              <div className="image-upload-row">
                <div className="image-upload">
                  <label>Image 1</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage1(e.target.files[0])}
                  />
                </div>
                <div className="image-upload">
                  <label>Image 2</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage2(e.target.files[0])}
                  />
                </div>
                <div className="image-upload">
                  <label>Image 3</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage3(e.target.files[0])}
                  />
                </div>
              </div>
              
              <div className="image-upload-row">
                <div className="image-upload">
                  <label>Image 4</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage4(e.target.files[0])}
                  />
                </div>
                <div className="image-upload">
                  <label>Image 5</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage5(e.target.files[0])}
                  />
                </div>
                <div className="image-upload">
                  <label>Status</label>
                  <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="draft">Draft</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>
              </div>
              
              <div className="form-buttons">
                <button 
                  type="button" 
                  className="clear-btn"
                  onClick={resetForm}
                >
                  Clear
                </button>
                <button 
                  type="submit" 
                  className="submit-btn"
                  disabled={loading}
                >
                  {loading ? 'Processing...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Blog;