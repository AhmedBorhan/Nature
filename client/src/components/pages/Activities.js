import React, { useEffect } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy'
import { Link } from 'react-router-dom'
import { commonStrings } from '../Strings'

function Activities() {
    const code = useStoreState(state => state.language.code);
    const activities = useStoreState(state => state.activity.activities);
    const getActivities = useStoreActions(state => state.activity.getActivities)
    useEffect(() => {
        getActivities()
    }, [])
    return (
        <>
            <div className="background a_bg">
            </div>
            <section className={code === 'en' ? "section-stories" : "right_to_left section-stories"}>
                <div className="u-center-text u-margin-bottom-big">
                    <h2 className="heading-secondary">
                        We make people genuinely happy
                    </h2>
                </div>
                {activities.length>0 && 
                    activities.map(activity =>(
                        <Link to={`/activity/${activity._id}`} className="row">
                            <div className="story">
                                <div className="story__shape">
                                    <p className="font_size activity_link">open link</p>
                                    <img className='story__img' src={activity.images[0].url} />
                                </div>
                                <div className="story__text">
                                    <h3 className="heading-tertiary u-margin-bottom-small">{activity.title[code]}</h3>
                                    <p>{activity.description[code]}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                }
                <div className="u-center-text u-margin-top-huge">
                    <Link to="" className="btn-text">Read all stories &rarr;</Link>
                </div>
            </section>
        </>
    )
}

export default Activities
