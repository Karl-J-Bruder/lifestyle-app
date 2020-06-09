import React, { useEffect, useContext, useState } from 'react';
import { FirebaseContext } from "../../../../firebase";
import SeriesItem from "../SeriesItem";

const EpisodeTable = () => {
    const { firebase } = useContext(FirebaseContext);
    const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("userCred")));
    const [seriesList, setSeriesList] = useState([]);
    let [count, setCount] = useState({ anime: 0, manga: 0, tv: 0, book: 0 })

    // Get list of series for the currently logged in user
    useEffect(() => {
        let info = JSON.parse(localStorage.getItem("userCred"));
        setCurrentUser(info)
        getList();
    }, [])

    // Count total number of series per medium
    useEffect(() => {
        seriesList.forEach(series => {
            countType(series)
        })
    }, [seriesList.length])

    // Get data from Firebase
    function getList() {
        firebase.db.collection("series").onSnapshot(handleSnapshot);
    }

    function handleSnapshot(snapshot) {
        const seriesList = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() }

        })
        // Filter list of series and display only those added by logged-in user 
        const filteredSeriesList = seriesList.filter(seriesEntry => seriesEntry.addedBy.id === currentUser.uid)
        setSeriesList(filteredSeriesList);
    }

    // Increment count for each series' medium
    const countType = (series) => {

        switch (series.medium) {
            case "Anime":
                setCount({ ...count, anime: count.anime += 1 });
                break
            case "Manga":
                setCount({ ...count, manga: count.manga += 1 });
                break
            case "TV":
                setCount({ ...count, tv: count.tv += 1 });
                break
            case "Book":
                setCount({ ...count, book: count.book += 1 });
                break
            default:
                console.error("Series category not found")
        }
    }

    return (
        <div>
            <table className="striped">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Series Name</th>
                        <th>Type</th>
                        <th>Progress</th>
                        <th>{" "}</th>
                    </tr>
                </thead>
                <tbody>
                    {seriesList.map((seriesItem, index) => (
                        <SeriesItem seriesItem={seriesItem} showCount={true} key={seriesItem.id} index={index + 1} />
                    ))}
                </tbody>
            </table>
            <p className="flow-text">Anime: {count.anime}  |   Manga: {count.manga}   |   TV: {count.tv}   |   Books: {count.book}</p>
        </div>
    )
}

export default EpisodeTable;