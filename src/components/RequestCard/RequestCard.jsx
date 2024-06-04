import React, { useEffect, useState } from "react";
import DetailsBox from "../DetailsBox";
import uploadServices from "../../appwrite/uploedservices";
import profileService from "../../appwrite/profile";
import { ID } from "appwrite";
import LoadingPage from "../LoadingPage";

const RequestCard = ({ request }) => {
  console.log(request)
  const [data, setData] = useState(null);

  const handleRejectClick = async () => {
    if (!request.allreq) {
      console.error("Request list is not defined");
      return;
    }

    try {
      const newRequests = request.allreq.filter((req) => req.id !== request.request.id);
      const newUpload = await uploadServices.updaterequests(request.slug, { requests: JSON.stringify(newRequests) });
      console.log(newUpload);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptClick = async () => {
    if (!request.allreq) {
      console.error("Request list is not defined");
      return;
    }

    try {
      const newRequests =[ ]
      await uploadServices.updaterequests(request.slug, { requests: JSON.stringify(newRequests) });

      if (data) {
        let pendingSection = JSON.parse(data.pendingSection || "[]");
        pendingSection = pendingSection.filter((id) => id !==request.slug);
        await profileService.updatependingSection(data.$id, { pendingSection: JSON.stringify(pendingSection) });

        const approvedSection = JSON.parse(data.approvedSection || "[]");
        approvedSection.push(request.slug);
        await profileService.updateapprovedSection(data.$id, { approvedSection: JSON.stringify(approvedSection) });
      }
    } catch (error) {
      console.error(error);
    }
  };
  console.log(request.currentDate);
  useEffect(() => {
    async function getUser() {
      try {
        const userData = await profileService.getUser(request.request.profileId);
        if (userData) {
          setData(userData);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUser();
   
  }, [request]);


  if (!data) {
    return <div><LoadingPage /></div>;
  }

  return (
    <div className="w-full h-fit m-5 p-3 flex items-center justify-center">
      <div className="w-[40vw] relative h-fit p-5 rounded-lg border border-slate-500 flex items-center justify-between">
        <div className="timing text-white absolute top-0 right-5">
          <p>{request.request.currentDate}</p>
        </div>
        <div className="ReqImage w-[8vw] flex items-center justify-center rounded-full overflow-hidden">
          <img src={data ? profileService.getFilePreview(data.imgId) : null} alt="Profile" />
        </div>
        <div className="ResDetails">
          <DetailsBox details={data.name} />
          <DetailsBox details={data.location} />
          <DetailsBox details={data.nofeed} />
          <DetailsBox details={data.phoneNumber} />
          <div className="btns flex items-center justify-end gap-5 w-full mt-2">
            <button onClick={handleRejectClick} className="btn btn-error">
              Reject
            </button>
            <button onClick={handleAcceptClick} className="btn btn-info">
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
