import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player';
import './video.css';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownAltOutlinedIcon from '@mui/icons-material/ThumbDownAltOutlined';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import {toast,ToastContainer} from 'react-toastify'
const Video = () => {
    const [message, setMessage] = useState("");
    const [data, setData] = useState(null);
    const [videoUrl, setVideoURL] = useState("");
    const { id } = useParams();
    const [comments, setComments] = useState([]);
    const fetchVedioById = async () => {
        await axios.get(`http://localhost:4000/api/getVideoById/${id}`).then((response) => {
            console.log(response.data.video);
            setData(response.data.video)
            setVideoURL(response.data.video.videoLink)
        }).catch(err => {
            console.log(err);
        })
    }
    const getCommentByVideoId = async () => {
        await axios.get(`http://localhost:4000/commentApi/comment/${id}`).then((response) => {
            console.log(response);
            setComments(response.data.comments)
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        fetchVedioById();
        getCommentByVideoId();
    }, [])
    const handleComment = async()=>{
        const body = {
            "message":message,
            "video":id
        }
        await axios.post('http://localhost:4000/commentApi/comment',body, { withCredentials: true }).then((resp)=>{
            console.log(resp)
            const newComment = resp.data.comment;
            setComments([newComment,...comments]);
            setMessage("")
        }).catch(err=>{
            toast.error("Please Login First to comment")
        })
    }
    return (
        <div className='video'>
            <div className="videoPostSection">
                <div className="video_youtube">
                    <video width="400" controls autoPlay className='video_youtube_video'>
                        <source src={"https://rr7---sn-42u-nbosd.googlevideo.com/videoplayback?expire=1730711567&ei=rzsoZ_DsOIq0kucP24CG0QM&ip=103.130.178.80&id=o-AHTCleG_szRjI4K4j2LnU5Gn98lHx4dXv8WM88ekzSIZ&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&bui=AQn3pFR9fRawYGGws3PT5kT7NUQ0LLKKTLGdxa2hILmDQ709WgPUg2huKUIW3HyH6wYvZC4YgL6RKisY&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=42659158&ratebypass=yes&dur=963.024&lmt=1730074825280268&fexp=24350590,24350655,24350675,24350705,24350737,51312688,51326932&c=MEDIA_CONNECT_FRONTEND&txp=5538434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRQIhAOjzxfi667BdNWES9XjmRI789AZT_ZOd1I6Ar6jvAq51AiAb6QWYePJN8EjBShQmeOnhDui9RkAzs4LGlQj1rZCZdw%3D%3D&title=I%20got%20a%20cat.&rm=sn-jvhj5nu-cvne776,sn-ab5eey7e&rrc=79,104&req_id=6821687b529fa3ee&rms=rdu,au&redirect_counter=2&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1730689996,&mh=4p&mip=42.119.231.121&mm=29&mn=sn-42u-nbosd&ms=rdu&mt=1730689266&mv=u&mvi=7&pl=24&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=ACJ0pHgwRQIhAKYXdI5HrK0f6DYBuc8Oqr7PJATUz8uvR5Fq3E1gUgruAiBrjX9JcLi7kMFeqbnZLjKjFhD-YH4Nho2R5uzGDJfj0w%3D%3D"} type="video/mp4" />
                        <source src={""} type="video/webm" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                <div className="video_youtubeAbout">
                    <div className="video_uTubeTitle">{data?.title}</div>
                    <div className="youtube_video_ProfileBlock">
                        <div className="youtube_video_ProfileBlock_left">
                            <Link to={`/user/${data?.user?._id}`} className="youtube_video_ProfileBlock_left_img">
                                <img className='youtube_video_ProfileBlock_left_image' src={data?.user?.profilePic} />
                            </Link>
                            <div className="youtubeVideo_subsView">
                                <div className="youtubePostProfileName"> {data?.user?.channelName} </div>
                                <div className="youtubePostProfileSubs">{data?.user?.createdAt.slice(0, 10)}</div>
                            </div>
                            <div className="subscribeBtnYoutube">Subscribe</div>
                        </div>
                        <div className="youtube_video_likeBlock">
                            <div className="youtube_video_likeBlock_like">
                                <ThumbUpOutlinedIcon />
                                <div className="youtube_video_likeBlock_NoOfLikes">{32}</div>
                            </div>
                            <div className="youtubeVideoDivider"></div>
                            <div className="youtube_video_likeBlock_like">
                                <ThumbDownAltOutlinedIcon />
                            </div>
                        </div>
                    </div>
                    <div className="youtube_video_About">
                        <div>{data?.createdAt.slice(0, 10)}</div>
                        <div>{data?.description}</div>
                    </div>
                </div>
                <div className="youtubeCommentSection">
                    <div className="youtubeCommentSectionTitle">{comments.length} Comments</div>
                    <div className="youtubeSelfComment">
                        {/* Please watch the video for the code} */}

                    </div>
                    <div className="youtubeOthersComments">
                        {
                            comments.map((item, index) => {
                                return (
                                    <div className="youtubeSelfComment">
                                        <img className='video_youtubeSelfCommentProfile' src={item?.user?.profilePic} />
                                            {/* Please watch the video for the code} */}
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </div>
            <div className="videoSuggestions">
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://rr5---sn-42u-nboss.googlevideo.com/videoplayback?expire=1730714611&ei=k0coZ5j-ELSIkucPt_Oe6AM&ip=192.95.83.96&id=o-APBj-UQB6VKDzkhSer52KIh1PdVGttg9Uro4Ikqt5rp9&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&pcm2=yes&bui=AQn3pFRIDAvjodhWoLT11GeZ7bxb0dDoAFTaPu-MFJAOlE2wPvAS-RW9EaWMgP0xDoqkdGgv98T1j__l&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=13562621&ratebypass=yes&dur=210.024&lmt=1726335219782711&fexp=24350590,24350655,24350675,24350703,24350705,24350737,51312688,51326932&c=MEDIA_CONNECT_FRONTEND&txp=5538434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cpcm2%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgaQIyckUQnjD94O4WNvDyGFKfHoJS4wZZChRGmRBky2kCIFg7H9rQ5qIF_mftkS1cW6BhuyOZIFgilZl0DQD7oYnf&title=Why%20is%20everyone%20better%20than%20me%EF%BC%9F%20-%20[animation]&redirect_counter=1&rm=sn-p5qeek76&rrc=104&req_id=b031bf1b6ff9a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1730693021,&mh=rE&mip=42.119.231.121&mm=31&mn=sn-42u-nboss&ms=au&mt=1730692611&mv=m&mvi=5&pcm2cms=yes&pl=24&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl,rms&lsig=ACJ0pHgwRQIhANmAN1COL1Yd8U3sqvN10OZSrOeRkYNwmU1ys3LSW4PcAiApD7jhRkYxojQ5FucYe0khjsnJ6TF93MwvO2F-qcWk1g%3D%3D"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">Why is everyone better than me? - [animation]</div>
                        <div className="video_suggetions_About_Profile">SkyeWei</div>
                        <div className="video_suggetions_About_Profile">6.8M views . 11 months ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://rr1---sn-42u-nboek.googlevideo.com/videoplayback?expire=1730712759&ei=V0AoZ6SyEZqHkucP65HRwQY&ip=45.196.60.142&id=o-AJfZJsWcMhZVo7S7nQR-01i0hPgOo88wP7hGoX_X7KAK&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AQn3pFQD0fKHFlcyxN6LLOUQU6MSEIXppY3Lfk1lEcvAilLcGqF0e8rI3_yrBQuS6jtKowaWIJTYAwtP&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=38120928&ratebypass=yes&dur=2790.597&lmt=1727708997066065&fexp=24350590,24350655,24350675,24350705,24350737,51312688,51326932&c=MEDIA_CONNECT_FRONTEND&txp=5538434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhAP6qI36qZKhTgrFcb_gStP2eWz2z0zYy4rOGtAoR5BnqAiEAx_M7xgqd-L4PpRMI3B8exjmhq6yf76E4VDEqoCUlYeI%3D&title=%CA%95%20%E2%80%A2%E1%B4%A5%E2%80%A2%CA%94%20de-stress%20study%20playlist%20(wave%20to%20earth,%20laufey,%20faye%20webster,%20and%20beabadoobee)%20%F0%9F%AB%A7&redirect_counter=1&rm=sn-p5qel77e&rrc=104&req_id=533844b300b8a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1730691166,&mh=Xw&mip=42.119.231.121&mm=31&mn=sn-42u-nboek&ms=au&mt=1730690706&mv=m&mvi=1&pl=24&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=ACJ0pHgwRgIhAL2hStalBUf8dRyDJ8pfm-H93q6e0B6THxq-_dOm5pUBAiEA_6myF2pAeFt_6pDrVsq8zPfCtrnYmn9dbOv0ZTamABI%3D"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">ʕ •ᴥ•ʔ de-stress study playlist (wave to earth, laufey, faye webster, and beabadoobee) 🫧</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://rr1---sn-42u-nboss.googlevideo.com/videoplayback?expire=1730712515&ei=Yj8oZ96tPMm3kucP7vnQ-As&ip=45.196.63.81&id=o-AIMfbvqNd7HUmss14tu_hFVf_Nj97vpNP2zDBr-ffB79&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AQn3pFQwMs3sNj_iO2bqHc5qq6C00fjpub_LRKUu-kflt8zmI1DLCPDAttI3hriUjlXUEAIC_2Y5yQ1Z&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=13466581&ratebypass=yes&dur=287.161&lmt=1728914705665043&fexp=24350590,24350655,24350675,24350705,24350737,51312688,51326932&c=MEDIA_CONNECT_FRONTEND&txp=5538434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgAVaR5mn5oH8RVMYpKXIzLPZFxS4l8zTK5v94Anjqz2cCICCzrI-ZnTwqSycD-9yjWtNDwM0y0MJz95RCh6j9Fje1&title=Under%20The%20Thicket%20%EF%BD%9C%20Animated%20Short%20Film&redirect_counter=1&rm=sn-p5qele7z&rrc=104&req_id=50bd04fb05f4a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1730690962,&mh=O9&mip=42.119.231.121&mm=31&mn=sn-42u-nboss&ms=au&mt=1730690706&mv=m&mvi=1&pl=24&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=ACJ0pHgwRgIhAIj_06x66FBU5y2Q1-DcCoTAnxOWk8NiNmdxHx6g7RGUAiEAzQjcthSU3kYO_-v2_Pp5A0yJwrQT4EnDS9CgCF94g9Q%3D"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">Under The Thicket | Animated Short Film</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://rr3---sn-42u-nbozs.googlevideo.com/videoplayback?expire=1730712504&ei=WD8oZ4fJN8qBkucP9cy04A0&ip=69.91.142.115&id=o-AJXD-TZHCwplkcNJX5amWWX-0523Wf0VEgs4ypw2IEoO&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AQn3pFQnBQjV-fnoMWNtYVLzgMx9VQpHgKgF8CqnOLAH9Sm3X-0alDmuEiM8SGUlkFvk25bk0e76CdR_&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=107381100&ratebypass=yes&dur=3618.202&lmt=1725822590603979&fexp=24350590,24350655,24350675,24350705,24350737,51312688,51326932&c=MEDIA_CONNECT_FRONTEND&txp=5438434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhAObi4XaYz6TvFoV9PjODEGZfAnCP19yvuRiO-_GmMO-RAiEA-ORjEbgJWnZaYBTGorw3ItmIMfYFcTAknIN4Y-86H4o%3D&title=1%20Hour%20-%20Relax%20&%20study%20with%20me%20Lofi%20%EF%BD%9C%20Mushie%20in%20a%20forest%20=&redirect_counter=1&rm=sn-ab5el77s&rrc=104&req_id=7d2c69ccb416a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1730690966,&mh=x9&mip=42.119.231.121&mm=31&mn=sn-42u-nbozs&ms=au&mt=1730690706&mv=m&mvi=3&pl=24&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=ACJ0pHgwRQIgC5tXHVZYYcKxEuEHKtWcXh2m_SNmyhusc8cNyJTe1Q4CIQCdYgJPqf-MJEAVY1gq3QO_P4qlj7GqdkjTukBdIHIYkw%3D%3D#timer%20#1hour%20#1hourloop%20#lofi"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">1 Hour - Relax & study with me Lofi | Mushie in a forest #timer #1hour #1hourloop #lofi</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://rr5---sn-42u-nboss.googlevideo.com/videoplayback?expire=1730714611&ei=k0coZ5j-ELSIkucPt_Oe6AM&ip=192.95.83.96&id=o-APBj-UQB6VKDzkhSer52KIh1PdVGttg9Uro4Ikqt5rp9&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&pcm2=yes&bui=AQn3pFRIDAvjodhWoLT11GeZ7bxb0dDoAFTaPu-MFJAOlE2wPvAS-RW9EaWMgP0xDoqkdGgv98T1j__l&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=13562621&ratebypass=yes&dur=210.024&lmt=1726335219782711&fexp=24350590,24350655,24350675,24350703,24350705,24350737,51312688,51326932&c=MEDIA_CONNECT_FRONTEND&txp=5538434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cpcm2%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgaQIyckUQnjD94O4WNvDyGFKfHoJS4wZZChRGmRBky2kCIFg7H9rQ5qIF_mftkS1cW6BhuyOZIFgilZl0DQD7oYnf&title=Why%20is%20everyone%20better%20than%20me%EF%BC%9F%20-%20[animation]&redirect_counter=1&rm=sn-p5qeek76&rrc=104&req_id=b031bf1b6ff9a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1730693021,&mh=rE&mip=42.119.231.121&mm=31&mn=sn-42u-nboss&ms=au&mt=1730692611&mv=m&mvi=5&pcm2cms=yes&pl=24&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pcm2cms,pl,rms&lsig=ACJ0pHgwRQIhANmAN1COL1Yd8U3sqvN10OZSrOeRkYNwmU1ys3LSW4PcAiApD7jhRkYxojQ5FucYe0khjsnJ6TF93MwvO2F-qcWk1g%3D%3D"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">Why is everyone better than me? - [animation]</div>
                        <div className="video_suggetions_About_Profile">SkyeWei</div>
                        <div className="video_suggetions_About_Profile">6.8M views . 11 months ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://rr1---sn-42u-nboek.googlevideo.com/videoplayback?expire=1730712759&ei=V0AoZ6SyEZqHkucP65HRwQY&ip=45.196.60.142&id=o-AJfZJsWcMhZVo7S7nQR-01i0hPgOo88wP7hGoX_X7KAK&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AQn3pFQD0fKHFlcyxN6LLOUQU6MSEIXppY3Lfk1lEcvAilLcGqF0e8rI3_yrBQuS6jtKowaWIJTYAwtP&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=38120928&ratebypass=yes&dur=2790.597&lmt=1727708997066065&fexp=24350590,24350655,24350675,24350705,24350737,51312688,51326932&c=MEDIA_CONNECT_FRONTEND&txp=5538434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhAP6qI36qZKhTgrFcb_gStP2eWz2z0zYy4rOGtAoR5BnqAiEAx_M7xgqd-L4PpRMI3B8exjmhq6yf76E4VDEqoCUlYeI%3D&title=%CA%95%20%E2%80%A2%E1%B4%A5%E2%80%A2%CA%94%20de-stress%20study%20playlist%20(wave%20to%20earth,%20laufey,%20faye%20webster,%20and%20beabadoobee)%20%F0%9F%AB%A7&redirect_counter=1&rm=sn-p5qel77e&rrc=104&req_id=533844b300b8a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1730691166,&mh=Xw&mip=42.119.231.121&mm=31&mn=sn-42u-nboek&ms=au&mt=1730690706&mv=m&mvi=1&pl=24&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=ACJ0pHgwRgIhAL2hStalBUf8dRyDJ8pfm-H93q6e0B6THxq-_dOm5pUBAiEA_6myF2pAeFt_6pDrVsq8zPfCtrnYmn9dbOv0ZTamABI%3D"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">ʕ •ᴥ•ʔ de-stress study playlist (wave to earth, laufey, faye webster, and beabadoobee) 🫧</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://rr1---sn-42u-nboss.googlevideo.com/videoplayback?expire=1730712515&ei=Yj8oZ96tPMm3kucP7vnQ-As&ip=45.196.63.81&id=o-AIMfbvqNd7HUmss14tu_hFVf_Nj97vpNP2zDBr-ffB79&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AQn3pFQwMs3sNj_iO2bqHc5qq6C00fjpub_LRKUu-kflt8zmI1DLCPDAttI3hriUjlXUEAIC_2Y5yQ1Z&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=13466581&ratebypass=yes&dur=287.161&lmt=1728914705665043&fexp=24350590,24350655,24350675,24350705,24350737,51312688,51326932&c=MEDIA_CONNECT_FRONTEND&txp=5538434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRAIgAVaR5mn5oH8RVMYpKXIzLPZFxS4l8zTK5v94Anjqz2cCICCzrI-ZnTwqSycD-9yjWtNDwM0y0MJz95RCh6j9Fje1&title=Under%20The%20Thicket%20%EF%BD%9C%20Animated%20Short%20Film&redirect_counter=1&rm=sn-p5qele7z&rrc=104&req_id=50bd04fb05f4a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1730690962,&mh=O9&mip=42.119.231.121&mm=31&mn=sn-42u-nboss&ms=au&mt=1730690706&mv=m&mvi=1&pl=24&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=ACJ0pHgwRgIhAIj_06x66FBU5y2Q1-DcCoTAnxOWk8NiNmdxHx6g7RGUAiEAzQjcthSU3kYO_-v2_Pp5A0yJwrQT4EnDS9CgCF94g9Q%3D"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">Under The Thicket | Animated Short Film</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
                <div className="videoSuggestionsBlock">
                    <div className="video_suggetion_thumbnail">
                        <video autoPlay muted className='video_suggetion_thumbnail_img'>
                            <source src={"https://rr3---sn-42u-nbozs.googlevideo.com/videoplayback?expire=1730712504&ei=WD8oZ4fJN8qBkucP9cy04A0&ip=69.91.142.115&id=o-AJXD-TZHCwplkcNJX5amWWX-0523Wf0VEgs4ypw2IEoO&itag=18&source=youtube&requiressl=yes&xpc=EgVo2aDSNQ%3D%3D&rms=au%2Cau&bui=AQn3pFQnBQjV-fnoMWNtYVLzgMx9VQpHgKgF8CqnOLAH9Sm3X-0alDmuEiM8SGUlkFvk25bk0e76CdR_&vprv=1&mime=video%2Fmp4&rqh=1&gir=yes&clen=107381100&ratebypass=yes&dur=3618.202&lmt=1725822590603979&fexp=24350590,24350655,24350675,24350705,24350737,51312688,51326932&c=MEDIA_CONNECT_FRONTEND&txp=5438434&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Cxpc%2Cbui%2Cvprv%2Cmime%2Crqh%2Cgir%2Cclen%2Cratebypass%2Cdur%2Clmt&sig=AJfQdSswRgIhAObi4XaYz6TvFoV9PjODEGZfAnCP19yvuRiO-_GmMO-RAiEA-ORjEbgJWnZaYBTGorw3ItmIMfYFcTAknIN4Y-86H4o%3D&title=1%20Hour%20-%20Relax%20&%20study%20with%20me%20Lofi%20%EF%BD%9C%20Mushie%20in%20a%20forest%20=&redirect_counter=1&rm=sn-ab5el77s&rrc=104&req_id=7d2c69ccb416a3ee&cms_redirect=yes&cmsv=e&ipbypass=yes&met=1730690966,&mh=x9&mip=42.119.231.121&mm=31&mn=sn-42u-nbozs&ms=au&mt=1730690706&mv=m&mvi=3&pl=24&lsparams=ipbypass,met,mh,mip,mm,mn,ms,mv,mvi,pl,rms&lsig=ACJ0pHgwRQIgC5tXHVZYYcKxEuEHKtWcXh2m_SNmyhusc8cNyJTe1Q4CIQCdYgJPqf-MJEAVY1gq3QO_P4qlj7GqdkjTukBdIHIYkw%3D%3D#timer%20#1hour%20#1hourloop%20#lofi"} type="video/mp4" />
                        </video>
                    </div>
                    <div className="video_suggetions_About">
                        <div className="video_suggetions_About_title">1 Hour - Relax & study with me Lofi | Mushie in a forest #timer #1hour #1hourloop #lofi</div>
                        <div className="video_suggetions_About_Profile">Cricket 320</div>
                        <div className="video_suggetions_About_Profile">136K views . 1 day ago</div>
                    </div>
                </div>
            </div>
            <ToastContainer/>
        </div>
    )
}
export default Video