import React, { useState, useEffect, useRef } from 'react';

const FacebookClone = () => {
  // States
  const [activeNav, setActiveNav] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [newPost, setNewPost] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [showComments, setShowComments] = useState({});
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [stories] = useState([
    { id: 1, user: 'Your Story', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=60&h=60&fit=crop&crop=face', hasStory: true, isYours: true },
    { id: 2, user: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c3f6e8?w=60&h=60&fit=crop&crop=face', hasStory: true },
    { id: 3, user: 'Mike Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&h=60&fit=crop&crop=face', hasStory: true },
    { id: 4, user: 'Sarah Wilson', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=60&h=60&fit=crop&crop=face', hasStory: false },
  ]);

  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Jane Smith',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c3f6e8?w=40&h=40&fit=crop&crop=face',
      time: '2h',
      content: 'Just had an amazing day at the beach! The weather was perfect and the sunset was breathtaking. 🌅',
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=300&fit=crop',
      likes: 24,
      comments: 5,
      shares: 2,
      type: 'post'
    },
    {
      id: 2,
      author: 'Mike Johnson',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face',
      time: '4h',
      content: 'Excited to announce that I just got promoted to Senior Developer! Thank you to everyone who supported me on this journey. 🚀',
      likes: 47,
      comments: 12,
      shares: 3,
      type: 'post'
    },
    {
      id: 3,
      author: 'Sarah Wilson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
      time: '6h',
      content: 'Making homemade pasta today! Recipe in comments if anyone wants it. 🍝',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=500&h=300&fit=crop',
      likes: 18,
      comments: 8,
      shares: 1,
      type: 'post'
    }
  ]);

  const [notifications] = useState([
    { id: 1, type: 'like', user: 'Jane Smith', content: 'liked your post', time: '5m', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c3f6e8?w=32&h=32&fit=crop&crop=face' },
    { id: 2, type: 'comment', user: 'Mike Johnson', content: 'commented on your photo', time: '2h', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face' },
    { id: 3, type: 'friend', user: 'Emma Thompson', content: 'sent you a friend request', time: '1d', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face' }
  ]);

  const [messages] = useState([
    { id: 1, user: 'Emma Thompson', message: 'Hey! How are you?', time: '2m', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face', unread: true },
    { id: 2, user: 'David Brown', message: 'Thanks for the help yesterday!', time: '1h', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face', unread: false },
    { id: 3, user: 'Lisa Garcia', message: 'See you at the meeting tomorrow', time: '3h', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face', unread: true }
  ]);

  const [contacts] = useState([
    { name: 'Emma Thompson', online: true, avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=32&h=32&fit=crop&crop=face' },
    { name: 'David Brown', online: false, avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face' },
    { name: 'Lisa Garcia', online: true, avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=32&h=32&fit=crop&crop=face' },
    { name: 'Tom Anderson', online: false, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=32&h=32&fit=crop&crop=face' },
    { name: 'Amy Chen', online: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=32&h=32&fit=crop&crop=face' },
  ]);

  // Add responsive state
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

  const fileInputRef = useRef(null);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsTablet(width <= 1024 && width > 768);
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Theme styles
  const getTheme = () => ({
    container: {
      backgroundColor: darkMode ? '#18191a' : '#ffffffff',
      color: darkMode ? '#e4e6ea' : '#1c1e21'
    },
    card: {
      backgroundColor: darkMode ? '#242526' : 'white',
      border: darkMode ? '1px solid #3a3b3c' : 'none'
    },
    text: {
      color: darkMode ? '#e4e6ea' : '#1c1e21'
    },
    secondaryText: {
      color: darkMode ? '#b0b3b8' : '#65676b'
    },
    border: {
      borderColor: darkMode ? '#3a3b3c' : '#ffffffff'
    },
    hover: {
      backgroundColor: darkMode ? '#3a3b3c' : '#ffffffff'
    }
  });

  const theme = getTheme();

  // Functions
  const handleSearch = (term) => {
    setSearchTerm(term);
    if (term.length > 0) {
      const results = [
        ...posts.filter(post => post.author.toLowerCase().includes(term.toLowerCase())),
        { type: 'user', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1494790108755-2616b9c3f6e8?w=32&h=32&fit=crop&crop=face' }
      ];
      setSearchResults(results);
      setShowSearch(true);
    } else {
      setShowSearch(false);
    }
  };

  const handleLike = (postId) => {
    setLikedPosts(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
    
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: likedPosts.includes(postId) ? post.likes - 1 : post.likes + 1 }
        : post
    ));
  };

  const addPost = () => {
    if (newPost.trim() || selectedImage) {
      const post = {
        id: Date.now(),
        author: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        time: 'now',
        content: newPost,
        image: selectedImage,
        likes: 0,
        comments: 0,
        shares: 0,
        type: 'post'
      };
      setPosts([post, ...posts]);
      setNewPost('');
      setSelectedImage(null);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const toggleComments = (postId) => {
    setShowComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const addComment = (postId) => {
    if (newComment[postId]?.trim()) {
      const comment = {
        id: Date.now(),
        author: 'John Doe',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face',
        content: newComment[postId],
        time: 'now'
      };
      
      setComments(prev => ({
        ...prev,
        [postId]: [...(prev[postId] || []), comment]
      }));
      
      setNewComment(prev => ({
        ...prev,
        [postId]: ''
      }));

      setPosts(prev => prev.map(post => 
        post.id === postId 
          ? { ...post, comments: post.comments + 1 }
          : post
      ));
    }
  };

  const styles = {
    container: {
      ...theme.container,
      minHeight: '100vh',
      fontFamily: 'Segoe UI, Roboto, Arial, sans-serif',
      fontSize: '14px',
      transition: 'all 0.3s ease'
    },
    header: {
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      backgroundColor: darkMode ? '#242526' : 'white',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      zIndex: 50,
      height: '56px',
      ...theme.border,
      borderBottom: `1px solid ${darkMode ? '#3a3b3c' : '#dadde1'}`
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: isMobile ? '0 8px' : '0 16px',
      height: '100%',
      maxWidth: '1920px',
      margin: '0 auto'
    },
    leftSection: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '8px' : '16px',
      flex: '1',
      maxWidth: isMobile ? '200px' : '320px'
    },
    logo: {
      fontSize: isMobile ? '20px' : '28px',
      fontWeight: 'bold',
      color: '#1877f2',
      cursor: 'pointer'
    },
    searchContainer: {
      position: 'relative',
      flex: '1',
      maxWidth: isMobile ? '120px' : '240px',
      display: isMobile ? 'none' : 'block'
    },
    searchBox: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: darkMode ? '#3a3b3c' : '#f0f2f5',
      borderRadius: '50px',
      padding: '10px 16px',
      width: '100%'
    },
    searchInput: {
      backgroundColor: 'transparent',
      border: 'none',
      outline: 'none',
      fontSize: '15px',
      width: '100%',
      marginLeft: '8px',
      ...theme.text
    },
    searchResults: {
      position: 'absolute',
      top: '100%',
      left: 0,
      right: 0,
      ...theme.card,
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      marginTop: '8px',
      maxHeight: '300px',
      overflowY: 'auto',
      zIndex: 1000
    },
    searchResult: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      cursor: 'pointer',
      borderBottom: `1px solid ${darkMode ? '#3a3b3c' : '#f0f2f5'}`
    },
    centerSection: {
      display: isMobile ? 'none' : 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flex: '1',
      maxWidth: '600px'
    },
    navButton: {
      padding: isMobile ? '8px 20px' : '12px 40px',
      border: 'none',
      backgroundColor: 'transparent',
      cursor: 'pointer',
      transition: 'all 0.2s',
      fontSize: isMobile ? '18px' : '24px',
      borderBottom: '3px solid transparent',
      borderRadius: '0',
      position: 'relative'
    },
    rightSection: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '4px' : '8px',
      flex: '1',
      justifyContent: 'flex-end',
      maxWidth: isMobile ? '150px' : '320px'
    },
    iconButton: {
      padding: '8px',
      backgroundColor: darkMode ? '#3a3b3c' : '#e4e6ea',
      borderRadius: '50%',
      border: 'none',
      cursor: 'pointer',
      position: 'relative',
      width: isMobile ? '36px' : '40px',
      height: isMobile ? '36px' : '40px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: isMobile ? '16px' : '20px',
      ...theme.text
    },
    badge: {
      position: 'absolute',
      top: '-2px',
      right: '-2px',
      backgroundColor: '#e41e3f',
      color: 'white',
      fontSize: '12px',
      fontWeight: 'bold',
      borderRadius: '50%',
      minWidth: '20px',
      height: '20px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      border: '2px solid white'
    },
    dropdown: {
      position: 'absolute',
      top: '50px',
      right: 0,
      ...theme.card,
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      minWidth: '300px',
      maxHeight: '400px',
      overflowY: 'auto',
      zIndex: 1000
    },
    dropdownItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '12px 16px',
      cursor: 'pointer',
      borderBottom: `1px solid ${darkMode ? '#3a3b3c' : '#f0f2f5'}`
    },
    mainContent: {
      display: 'flex',
      paddingTop: '56px',
      paddingBottom: isMobile ? '60px' : '0',
      ...theme.container,
      maxWidth: '1920px',
      margin: '0 auto'
    },
    sidebar: {
      position: 'fixed',
      left: 0,
      width: isMobile ? '0' : isTablet ? '280px' : '360px',
      height: 'calc(100vh - 56px)',
      overflowY: 'auto',
      padding: '20px 8px',
      backgroundColor: 'transparent',
      display: isMobile ? 'none' : 'block'
    },
    feed: {
      flex: '1',
      marginLeft: isMobile ? '0' : isTablet ? '280px' : '360px',
      marginRight: isMobile ? '0' : isTablet ? '0' : '360px',
      padding: isMobile ? '10px' : '20px 0',
      maxWidth: isMobile ? '100%' : '500px',
      margin: isMobile ? '10px auto' : '0 auto',
      width: isMobile ? 'calc(100% - 20px)' : 'auto'
    },
    storiesContainer: {
      display: 'flex',
      gap: '8px',
      padding: isMobile ? '12px' : '16px',
      ...theme.card,
      borderRadius: '8px',
      marginBottom: '20px',
      overflowX: 'auto',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none'
    },
    story: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      minWidth: isMobile ? '60px' : '80px',
      cursor: 'pointer'
    },
    storyAvatar: {
      width: isMobile ? '50px' : '60px',
      height: isMobile ? '50px' : '60px',
      borderRadius: '50%',
      border: '3px solid #1877f2',
      marginBottom: '4px',
      position: 'relative'
    },
    storyName: {
      fontSize: isMobile ? '10px' : '12px',
      ...theme.text,
      textAlign: 'center',
      wordBreak: 'break-word'
    },
    addStoryButton: {
      position: 'absolute',
      bottom: '-2px',
      right: '-2px',
      width: '20px',
      height: '20px',
      backgroundColor: '#1877f2',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '12px',
      border: '2px solid white'
    },
    card: {
      ...theme.card,
      borderRadius: '8px',
      boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
      marginBottom: '20px'
    },
    createPostContainer: {
      padding: '16px'
    },
    createPostHeader: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '16px'
    },
    createPostInput: {
      backgroundColor: darkMode ? '#3a3b3c' : '#f0f2f5',
      borderRadius: '25px',
      padding: '12px 16px',
      border: 'none',
      outline: 'none',
      flex: '1',
      fontSize: '16px',
      resize: 'none',
      ...theme.text
    },
    imagePreview: {
      marginTop: '12px',
      borderRadius: '8px',
      maxWidth: '100%',
      maxHeight: '300px',
      objectFit: 'cover'
    },
    actionButtons: {
      display: 'flex',
      justifyContent: 'space-around',
      padding: '4px',
      borderTop: `1px solid ${darkMode ? '#3a3b3c' : '#dadde1'}`
    },
    actionButton: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      ...theme.secondaryText,
      background: 'none',
      border: 'none',
      padding: '12px 16px',
      borderRadius: '8px',
      cursor: 'pointer',
      flex: '1',
      justifyContent: 'center',
      transition: 'background-color 0.2s',
      fontSize: '15px',
      fontWeight: '600'
    },
    postHeader: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: '16px',
      padding: '16px 16px 0'
    },
    postAuthor: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px'
    },
    postContent: {
      ...theme.text,
      marginBottom: '16px',
      lineHeight: '1.34',
      fontSize: '15px',
      padding: '0 16px'
    },
    postImage: {
      width: '100%',
      maxHeight: '400px',
      objectFit: 'cover',
      marginBottom: '16px'
    },
    postStats: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '8px',
      ...theme.secondaryText,
      fontSize: '15px',
      padding: '0 16px'
    },
    commentsSection: {
      padding: '16px',
      ...theme.border,
      borderTop: `1px solid ${darkMode ? '#3a3b3c' : '#dadde1'}`
    },
    comment: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: '8px',
      marginBottom: '12px'
    },
    commentBubble: {
      ...theme.card,
      backgroundColor: darkMode ? '#3a3b3c' : '#f0f2f5',
      borderRadius: '16px',
      padding: '8px 12px',
      flex: '1'
    },
    commentInput: {
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      marginTop: '8px'
    },
    commentInputField: {
      flex: '1',
      backgroundColor: darkMode ? '#3a3b3c' : '#f0f2f5',
      border: 'none',
      borderRadius: '20px',
      padding: '8px 12px',
      outline: 'none',
      ...theme.text
    },
    darkModeToggle: {
      position: 'fixed',
      bottom: isMobile ? '10px' : '20px',
      right: isMobile ? '10px' : '20px',
      width: isMobile ? '48px' : '56px',
      height: isMobile ? '48px' : '56px',
      borderRadius: '50%',
      backgroundColor: darkMode ? '#42a5f5' : '#1877f2',
      border: 'none',
      color: 'white',
      fontSize: isMobile ? '20px' : '24px',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000
    },
    // Add right sidebar for desktop only
    rightSidebar: {
      position: 'fixed',
      right: 0,
      width: isMobile || isTablet ? '0' : '360px',
      height: 'calc(100vh - 56px)',
      overflowY: 'auto',
      padding: '20px 8px',
      backgroundColor: 'transparent',
      display: isMobile || isTablet ? 'none' : 'block'
    },
    mobileNav: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: darkMode ? '#242526' : 'white',
      borderTop: `1px solid ${darkMode ? '#3a3b3c' : '#dadde1'}`,
      display: isMobile ? 'flex' : 'none',
      justifyContent: 'space-around',
      padding: '8px 0',
      zIndex: 50
    },
    mobileNavButton: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: '4px 8px',
      fontSize: '20px'
    },
    mobileNavText: {
      fontSize: '10px',
      marginTop: '2px',
      ...theme.secondaryText
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <div style={styles.headerContent}>
          {/* Left Section */}
          <div style={styles.leftSection}>
            <div style={styles.logo}>facebook</div>
            <div style={styles.searchContainer}>
              <div style={styles.searchBox}>
                <span style={{...theme.secondaryText, fontSize: '16px'}}>🔍</span>
                <input 
                  type="text" 
                  placeholder="Search Facebook" 
                  style={styles.searchInput}
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => searchTerm && setShowSearch(true)}
                />
              </div>
              {showSearch && (
                <div style={styles.searchResults}>
                  {searchResults.map((result, index) => (
                    <div key={index} style={styles.searchResult}>
                      <img 
                        src={result.avatar || result.author?.avatar} 
                        style={{width: '32px', height: '32px', borderRadius: '50%'}}
                        alt=""
                      />
                      <span style={theme.text}>
                        {result.name || result.author || result.content?.substring(0, 50)}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Section */}
          <div style={styles.centerSection}>
            <button 
              style={{
                ...styles.navButton,
                color: activeNav === 'home' ? '#1877f2' : theme.secondaryText.color,
                borderBottom: activeNav === 'home' ? '3px solid #1877f2' : 'none'
              }}
              onClick={() => setActiveNav('home')}
            >
              🏠
            </button>
            <button 
              style={{
                ...styles.navButton,
                color: activeNav === 'people' ? '#1877f2' : theme.secondaryText.color,
                borderBottom: activeNav === 'people' ? '3px solid #1877f2' : 'none'
              }}
              onClick={() => setActiveNav('people')}
            >
              👥
            </button>
            <button 
              style={{
                ...styles.navButton,
                color: activeNav === 'video' ? '#1877f2' : theme.secondaryText.color,
                borderBottom: activeNav === 'video' ? '3px solid #1877f2' : 'none'
              }}
              onClick={() => setActiveNav('video')}
            >
              📺
            </button>
            <button 
              style={{
                ...styles.navButton,
                color: activeNav === 'store' ? '#1877f2' : theme.secondaryText.color,
                borderBottom: activeNav === 'store' ? '3px solid #1877f2' : 'none'
              }}
              onClick={() => setActiveNav('store')}
            >
              🛒
            </button>
            <button 
              style={{
                ...styles.navButton,
                color: activeNav === 'groups' ? '#1877f2' : theme.secondaryText.color,
                borderBottom: activeNav === 'groups' ? '3px solid #1877f2' : 'none'
              }}
              onClick={() => setActiveNav('groups')}
            >
              👥
            </button>
          </div>

          {/* Right Section */}
          <div style={styles.rightSection}>
            <button style={styles.iconButton}>☰</button>
            
            <div style={{position: 'relative'}}>
              <button 
                style={styles.iconButton}
                onClick={() => setShowMessages(!showMessages)}
              >
                💬
                <span style={styles.badge}>
                  {messages.filter(m => m.unread).length}
                </span>
              </button>
              {showMessages && (
                <div style={styles.dropdown}>
                  <div style={{padding: '16px', borderBottom: `1px solid ${theme.border.borderColor}`}}>
                    <h3 style={{margin: 0, ...theme.text}}>Messages</h3>
                  </div>
                  {messages.map(message => (
                    <div key={message.id} style={styles.dropdownItem}>
                      <img 
                        src={message.avatar} 
                        style={{width: '32px', height: '32px', borderRadius: '50%'}}
                        alt=""
                      />
                      <div style={{flex: 1}}>
                        <div style={{...theme.text, fontWeight: message.unread ? '600' : '400'}}>
                          {message.user}
                        </div>
                        <div style={{...theme.secondaryText, fontSize: '13px'}}>
                          {message.message}
                        </div>
                      </div>
                      <div style={{...theme.secondaryText, fontSize: '12px'}}>
                        {message.time}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div style={{position: 'relative'}}>
              <button 
                style={styles.iconButton}
                onClick={() => setShowNotifications(!showNotifications)}
              >
                🔔
                <span style={styles.badge}>{notifications.length}</span>
              </button>
              {showNotifications && (
                <div style={styles.dropdown}>
                  <div style={{padding: '16px', borderBottom: `1px solid ${theme.border.borderColor}`}}>
                    <h3 style={{margin: 0, ...theme.text}}>Notifications</h3>
                  </div>
                  {notifications.map(notification => (
                    <div key={notification.id} style={styles.dropdownItem}>
                      <img 
                        src={notification.avatar} 
                        style={{width: '32px', height: '32px', borderRadius: '50%'}}
                        alt=""
                      />
                      <div style={{flex: 1}}>
                        <div style={theme.text}>
                          <strong>{notification.user}</strong> {notification.content}
                        </div>
                        <div style={{...theme.secondaryText, fontSize: '13px'}}>
                          {notification.time} ago
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <img 
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
              alt="Profile" 
              style={{width: '40px', height: '40px', borderRadius: '50%', cursor: 'pointer'}}
            />
          </div>
        </div>

        {/* Right Sidebar - Desktop Only */}
        {!isMobile && !isTablet && (
          <div style={styles.rightSidebar}>
            <div style={{padding: '20px', ...theme.text}}>
              <h3 style={{...theme.secondaryText, fontSize: '17px', marginBottom: '16px'}}>Sponsored</h3>
              <div style={{...styles.card, padding: '12px', marginBottom: '20px'}}>
                <div style={{display: 'flex', alignItems: 'center', gap: '12px'}}>
                  <img 
                    src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=50&h=50&fit=crop" 
                    style={{width: '48px', height: '48px', borderRadius: '8px'}}
                    alt="Ad"
                  />
                  <div>
                    <div style={{fontWeight: '600', fontSize: '14px'}}>Learn Web Development</div>
                    <div style={{...theme.secondaryText, fontSize: '12px'}}>codecademy.com</div>
                  </div>
                </div>
              </div>
              
              <h3 style={{...theme.secondaryText, fontSize: '17px', marginBottom: '16px'}}>Contacts</h3>
              {contacts.map((contact, index) => (
                <div key={index} style={{display: 'flex', alignItems: 'center', gap: '12px', padding: '8px', borderRadius: '8px', marginBottom: '4px', cursor: 'pointer'}}>
                  <div style={{position: 'relative'}}>
                    <img 
                      src={contact.avatar} 
                      style={{width: '32px', height: '32px', borderRadius: '50%'}}
                      alt={contact.name}
                    />
                    {contact.online && (
                      <div style={{
                        position: 'absolute',
                        bottom: '-2px',
                        right: '-2px',
                        width: '12px',
                        height: '12px',
                        backgroundColor: '#31a24c',
                        border: '2px solid white',
                        borderRadius: '50%'
                      }}></div>
                    )}
                  </div>
                  <span style={{fontSize: '15px', fontWeight: '500'}}>{contact.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div style={styles.mainContent}>
        {/* Left Sidebar - Desktop Only */}
        {!isMobile && !isTablet && (
          <div style={styles.sidebar}>
            {/* Sidebar content here - keeping it simple for now */}
            <div style={{padding: '20px', ...theme.text}}>
              <div style={{marginBottom: '20px'}}>
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=36&h=36&fit=crop&crop=face" 
                  style={{width: '36px', height: '36px', borderRadius: '50%', marginRight: '12px'}}
                  alt="Profile"
                />
                <span style={{fontWeight: '600'}}>John Doe</span>
              </div>
              <div style={{...theme.secondaryText, fontSize: '15px'}}>
                <div style={{marginBottom: '8px'}}>👥 Friends</div>
                <div style={{marginBottom: '8px'}}>👥 Groups</div>
                <div style={{marginBottom: '8px'}}>🛒 Marketplace</div>
                <div style={{marginBottom: '8px'}}>📺 Watch</div>
                <div style={{marginBottom: '8px'}}>📷 Photos</div>
              </div>
            </div>
          </div>
        )}

        {/* Feed */}
        <div style={styles.feed}>
          {/* Stories */}
          <div style={styles.storiesContainer}>
            {stories.map(story => (
              <div key={story.id} style={styles.story}>
                <div style={{position: 'relative'}}>
                  <img 
                    src={story.avatar} 
                    style={{
                      ...styles.storyAvatar,
                      border: story.hasStory ? '3px solid #1877f2' : '3px solid #dadde1'
                    }}
                    alt=""
                  />
                  {story.isYours && (
                    <div style={styles.addStoryButton}>+</div>
                  )}
                </div>
                <div style={styles.storyName}>{story.user}</div>
              </div>
            ))}
          </div>

          {/* Create Post */}
          <div style={styles.card}>
            <div style={styles.createPostContainer}>
              <div style={styles.createPostHeader}>
                <img 
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face" 
                  alt="Profile" 
                  style={{width: '40px', height: '40px', borderRadius: '50%'}}
                />
                <textarea
                  placeholder="What's on your mind, John?"
                  style={styles.createPostInput}
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  rows="3"
                />
                {selectedImage && (
                  <div>
                    <img src={selectedImage} style={styles.imagePreview} alt="Preview" />
                    <button 
                      onClick={() => setSelectedImage(null)}
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        background: 'rgba(0,0,0,0.7)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        cursor: 'pointer'
                      }}
                    >
                      ×
                    </button>
                  </div>
                )}
              </div>
              <hr style={{margin: '16px 0', border: 'none', borderTop: `1px solid ${theme.border.borderColor}`}} />
              <div style={{display: 'flex', justifyContent: 'space-around'}}>
                <button 
                  style={styles.actionButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = theme.hover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <span style={{color: '#f02849', fontSize: '20px'}}>📹</span>
                  <span>Live video</span>
                </button>
                <button 
                  style={styles.actionButton}
                  onClick={() => fileInputRef.current?.click()}
                  onMouseEnter={(e) => e.target.style.backgroundColor = theme.hover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <span style={{color: '#45bd62', fontSize: '20px'}}>📷</span>
                  <span>Photo/video</span>
                </button>
                <button 
                  style={styles.actionButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = theme.hover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <span style={{color: '#f7b928', fontSize: '20px'}}>😊</span>
                  <span>Feeling/activity</span>
                </button>
              </div>
              {(newPost.trim() || selectedImage) && (
                <div style={{marginTop: '12px', textAlign: 'right'}}>
                  <button
                    onClick={addPost}
                    style={{
                      backgroundColor: '#1877f2',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      padding: '8px 16px',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Post
                  </button>
                </div>
              )}
            </div>
          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImageUpload}
            accept="image/*"
            style={{display: 'none'}}
          />

          {/* Posts */}
          {posts.map((post) => (
            <div key={post.id} style={styles.card}>
              <div style={styles.postHeader}>
                <div style={styles.postAuthor}>
                  <img 
                    src={post.avatar} 
                    alt={post.author} 
                    style={{width: '40px', height: '40px', borderRadius: '50%'}}
                  />
                  <div>
                    <h3 style={{margin: 0, fontWeight: '600', fontSize: '15px', ...theme.text}}>
                      {post.author}
                    </h3>
                    <p style={{margin: '2px 0 0', fontSize: '13px', ...theme.secondaryText}}>
                      {post.time} ago
                    </p>
                  </div>
                </div>
                <button 
                  style={{
                    ...styles.actionButton,
                    padding: '8px',
                    fontSize: '20px'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = theme.hover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  ⋯
                </button>
              </div>
              
              <div style={styles.postContent}>{post.content}</div>
              
              {post.image && (
                <img src={post.image} style={styles.postImage} alt="Post content" />
              )}
              
              <div style={styles.postStats}>
                <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    backgroundColor: '#1877f2',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '10px',
                    color: 'white'
                  }}>👍</div>
                  <span>{post.likes}</span>
                </div>
                <div>
                  <span>{post.comments} comments • {post.shares} shares</span>
                </div>
              </div>
              
              <div style={styles.actionButtons}>
                <button 
                  style={{
                    ...styles.actionButton,
                    color: likedPosts.includes(post.id) ? '#1877f2' : theme.secondaryText.color
                  }}
                  onClick={() => handleLike(post.id)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = theme.hover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <span style={{fontSize: '18px'}}>👍</span>
                  <span>Like</span>
                </button>
                <button 
                  style={styles.actionButton}
                  onClick={() => toggleComments(post.id)}
                  onMouseEnter={(e) => e.target.style.backgroundColor = theme.hover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <span style={{fontSize: '18px'}}>💬</span>
                  <span>Comment</span>
                </button>
                <button 
                  style={styles.actionButton}
                  onMouseEnter={(e) => e.target.style.backgroundColor = theme.hover.backgroundColor}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
                >
                  <span style={{fontSize: '18px'}}>📤</span>
                  <span>Share</span>
                </button>
              </div>

              {showComments[post.id] && (
                <div style={styles.commentsSection}>
                  {comments[post.id]?.map(comment => (
                    <div key={comment.id} style={styles.comment}>
                      <img 
                        src={comment.avatar} 
                        style={{width: '32px', height: '32px', borderRadius: '50%'}}
                        alt=""
                      />
                      <div style={styles.commentBubble}>
                        <div style={{fontWeight: '600', fontSize: '13px', ...theme.text}}>
                          {comment.author}
                        </div>
                        <div style={{...theme.text, fontSize: '14px'}}>
                          {comment.content}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  <div style={styles.commentInput}>
                    <img 
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" 
                      style={{width: '32px', height: '32px', borderRadius: '50%'}}
                      alt=""
                    />
                    <input
                      type="text"
                      placeholder="Write a comment..."
                      value={newComment[post.id] || ''}
                      onChange={(e) => setNewComment(prev => ({
                        ...prev,
                        [post.id]: e.target.value
                      }))}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addComment(post.id);
                        }
                      }}
                      style={styles.commentInputField}
                    />
                    <button
                      onClick={() => addComment(post.id)}
                      style={{
                        backgroundColor: '#1877f2',
                        color: 'white',
                        border: 'none',
                        borderRadius: '50%',
                        width: '32px',
                        height: '32px',
                        cursor: 'pointer',
                        fontSize: '16px'
                      }}
                    >
                      ➤
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobile && (
        <div style={styles.mobileNav}>
          <button 
            style={{
              ...styles.mobileNavButton,
              color: activeNav === 'home' ? '#1877f2' : theme.secondaryText.color
            }}
            onClick={() => setActiveNav('home')}
          >
            <span>🏠</span>
            <span style={styles.mobileNavText}>Home</span>
          </button>
          <button 
            style={{
              ...styles.mobileNavButton,
              color: activeNav === 'people' ? '#1877f2' : theme.secondaryText.color
            }}
            onClick={() => setActiveNav('people')}
          >
            <span>👥</span>
            <span style={styles.mobileNavText}>Friends</span>
          </button>
          <button 
            style={{
              ...styles.mobileNavButton,
              color: activeNav === 'video' ? '#1877f2' : theme.secondaryText.color
            }}
            onClick={() => setActiveNav('video')}
          >
            <span>📺</span>
            <span style={styles.mobileNavText}>Watch</span>
          </button>
          <button 
            style={{
              ...styles.mobileNavButton,
              color: activeNav === 'store' ? '#1877f2' : theme.secondaryText.color
            }}
            onClick={() => setActiveNav('store')}
          >
            <span>🛒</span>
            <span style={styles.mobileNavText}>Store</span>
          </button>
          <button 
            style={{
              ...styles.mobileNavButton,
              color: activeNav === 'groups' ? '#1877f2' : theme.secondaryText.color
            }}
            onClick={() => setActiveNav('groups')}
          >
            <span>👥</span>
            <span style={styles.mobileNavText}>Groups</span>
          </button>
        </div>
      )}

      {/* Dark Mode Toggle */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={styles.darkModeToggle}
      >
        {darkMode ? '☀️' : '🌙'}
      </button>

      {/* Click outside to close dropdowns */}
      {(showSearch || showNotifications || showMessages) && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => {
            setShowSearch(false);
            setShowNotifications(false);
            setShowMessages(false);
          }}
        />
      )}
    </div>
  );
};

export default FacebookClone;