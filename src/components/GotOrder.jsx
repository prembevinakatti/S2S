import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import uploadServices from '../appwrite/uploedservices';
import profileService from '../appwrite/profile';
import toast from 'react-hot-toast';

const GotOrder = ({ data }) => {
  const [profileData, setProfileData] = useState(null);
  const reduxProfileData = useSelector((state) => state.profile.profiledata);
  const [respro, setRespro] = useState(null);

  const handleApprove = async () => {
    try {
      let approvedSection = JSON.parse(reduxProfileData.approvedSection || '[]');
      approvedSection = approvedSection.filter((id) => id !== data.slug);

      const updateApp = await profileService.updateapprovedSection(reduxProfileData.$id, {
        approvedSection: JSON.stringify(approvedSection),
      });

      if (updateApp) {
        await updateCharts();
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
      toast.error('Error in handleApprove');
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
        toast.error('Error fetching user data');
      }
    };

    const getFoodData = async () => {
      try {
        const foodOwner = await profileService.getUser(data.respro.name);
        if (foodOwner) {
          setRespro(foodOwner);
        }
      } catch (error) {
        console.error('Error fetching food data:', error);
      }
    };

    if (reduxProfileData?.$id) {
      getUser();
    }
    if (data?.respro?.name) {
      getFoodData();
    }
  }, [reduxProfileData, data]);

  const updateCharts = async () => {
    if (!respro) return;

    const feed = reduxProfileData.nofeed;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    const day = currentDate.getDate();
    const datee = `${year}/${month}/${day}`;
    const newEntry = { nuberoffeed: feed, date: datee };

    try {
      let newCharts;

      if (respro.charts) {
        try {
          newCharts = JSON.parse(respro.charts);
          if (!Array.isArray(newCharts)) {
            throw new Error('Charts data is not an array');
          }
        } catch (parseError) {
          console.error('Error parsing charts data:', parseError);
          newCharts = [];
        }
      } else {
        newCharts = [];
      }

      newCharts.push(newEntry);
      const updateRes = await profileService.updatecharts(respro.$id, { charts: JSON.stringify(newCharts) });

      if (updateRes) {
        window.location.reload();
        toast.success('Chart updated successfully');
      }
    } catch (error) {
      console.error('Error updating charts:', error);
      toast.error('Error updating charts');
    }
  };

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
