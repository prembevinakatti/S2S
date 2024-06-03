import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import uploadServices from '../appwrite/uploedservices';
import profileService from '../appwrite/profile';

const GotOrder = ({ data }) => {
  const [profileData, setProfileData] = useState(null);
  const reduxProfileData = useSelector((state) => state.profile.profiledata);

  const handleApprove = async () => {
    try {
      if (!profileData) throw new Error('Profile data not loaded');

      // Update approvedSection
      let approvedSection = JSON.parse(profileData.approvedSection || '[]');
      approvedSection = approvedSection.filter((id) => id !== data.slug);

      const updateApp = await profileService.updateapprovedSection(profileData.$id, {
        approvedSection: JSON.stringify(approvedSection),
      });

      if (updateApp) {
        // Update deliveredSection
        let deliveredSection = JSON.parse(profileData.deliveredSection || '[]');
        deliveredSection.push(data.slug);

        const updateDel = await profileService.updatedeliveredSection(profileData.$id, {
          deliveredSection: JSON.stringify(deliveredSection),
        });

        if (updateDel) {
          console.log('Delivered');
          const updateStatusData = { slug: data.slug, status: 'delivered' };
          await uploadServices.updatestatus(updateStatusData);
        }
      }
    } catch (error) {
      console.error('Error in handleApprove:', error);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const userData = await profileService.getUser(reduxProfileData.$id);
        if (userData) {
          setProfileData(userData);
        }
      } catch (error) {
        console.error('Error in getUser:', error);
      }
    };
    getUser();
  }, [reduxProfileData]);

  return (
    <div className='w-full flex m-5 items-center justify-center'>
      <div className='GotOrder w-fit h-fit border p-3 border-slate-500 rounded-lg flex flex-col gap-10 items-center justify-center'>
        <h2 className='w-full text-4xl font-semibold text-center'>Got Your Order..?</h2>
        <div className='GotBtns flex items-center gap-5'>
          <button className='btn btn-wide btn-success' onClick={handleApprove}>
            Yes
          </button>
          <button className='btn btn-wide btn-error'>No</button>
        </div>
      </div>
    </div>
  );
};

export default GotOrder;
