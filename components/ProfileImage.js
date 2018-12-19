// ProfileImage.js
// http://source.unsplash.com/msnyz9L6gs4
import React from 'react'

const ProfileImage = ({src}) => {
  return(
    <div className="profile-image">
    <style jsx>{`
        .profile-image {
            background-image: url('${src}');
            width: 200px;
            height: 200px;
            border-radius: 50%;
            margin: 0 auto;
            margin-bottom: 20px;
            background-color: #fafafa;
            background-size: cover;
            background-position: center;
        }
    `}</style>
    </div>
)};

export default ProfileImage