// src/AnimeSort.js
import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import Gungwah from './image/Anggota 1.JPG';
import Rifaldi from './image/Anggota 4.jpg';
import CardProfile from './assets/card';

class Anime {
    constructor(nama, rating) {
        this.nama = nama;
        this.rating = rating;
    }
}

const getAllCombinations = (words) => {
    let result = [];
    const combine = (prefix, words) => {
        for (let i = 0; i < words.length; i++) {
            result.push(prefix + words[i]);
            combine(prefix + words[i] + ' ', words.slice(i + 1));
        }
    };
    combine('', words);
    return result;
};

const generateUniqueRandomRatings = (count, min = 400, max = 4000000000) => {
    let ratings = new Set();
    while (ratings.size < count) {
        let i = 1;
        for (i = 1 ; i <= 10; i++){
            const randomRating = i * Math.floor(Math.random() * (max - min + 1)) + min;
            ratings.add(randomRating);
        }
    }
    return Array.from(ratings);
};

const AnimeSort = () => {
    const [animeList, setAnimeList] = useState([]);
    const [executionTime, setExecutionTime] = useState('');
    const [dataCount, setDataCount] = useState(0);
    const [iterativeTimes, setIterativeTimes] = useState([]);
    const [recursiveTimes, setRecursiveTimes] = useState([]);
    const [dataSizes, setDataSizes] = useState([]);
    const [sortedAnimeList, setSortedAnimeList] = useState([]);

    const addAnimeCombinations = (words, ratings) => {
        const combinations = getAllCombinations(words);
        const newAnimeList = combinations.slice(0, ratings.length).map((combination, index) => {
            return new Anime(combination.trim(), ratings[index]);
        });
        setAnimeList(newAnimeList);
        setDataCount(newAnimeList.length);
    };

    const generateAnimeList = (dataCount) => {
        const words = ["Attack", "On", "Titan", "Boku", "No", "Hero", "Academia", "One", "Piece", "Naruto", "Shippuden", "Hina", "Ya", "Kaguya", "Sama"];
        const ratings = generateUniqueRandomRatings(dataCount);
        addAnimeCombinations(words, ratings);
        setDataSizes(prevSizes => [...prevSizes, dataCount]);
    };

    const bubbleSort = (arr) => {
        let startTime = performance.now();
        let n = arr.length;
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j < n - i; j++) {
                if (arr[j].rating > arr[j + 1].rating) {
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;
                }
            }   
        }
        let endTime = performance.now();
        return endTime - startTime;
    };

    const sortIterative = () => {
        const timeTaken = bubbleSort([...animeList]);
        setExecutionTime(`Iterative Bubble Sort Time: ${timeTaken.toFixed(2)} ms`);
        setIterativeTimes(prevTimes => [...prevTimes, timeTaken]);
        setSortedAnimeList([...animeList].sort((a, b) => a.rating - b.rating));
    };

    const bubbleSortRecursive = (arr, n) => {
        if (n === 1) return;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i].rating > arr[i + 1].rating) {
                let temp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = temp;
            }
        }
        bubbleSortRecursive(arr, n - 1);
    };

    const startRecursiveSort = (arr) => {
        let startTime = performance.now();
        bubbleSortRecursive(arr, arr.length);
        let endTime = performance.now();
        return endTime - startTime;
    };

    const sortRecursive = () => {
        const timeTaken = startRecursiveSort([...animeList]);
        setExecutionTime(`Recursive Bubble Sort Time: ${timeTaken.toFixed(2)} ms`);
        setRecursiveTimes(prevTimes => [...prevTimes, timeTaken]);
        setSortedAnimeList([...animeList].sort((a, b) => a.rating - b.rating));
    };

    const data = {
        labels: dataSizes,
        datasets: [
            {
                label: 'Iterative Bubble Sort',
                data: iterativeTimes,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
            {
                label: 'Recursive Bubble Sort',
                data: recursiveTimes,
                borderColor: 'rgba(255, 99, 132, 1)',
                fill: false,
            },
        ],
    };

    return (
        <div className="container mx-auto p-4">
        <div className="flex items-center justify-center h-20 top-0 w-full bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-300">
            <h1 className="text-xl font-bold text-white">Sorting Anime Berdasarkan Jumlah Pengguna Memberikan Rating</h1>
        </div>
        <div className='flex flex-row justify-center m-2 p-4'>
          <CardProfile src={Gungwah} alt="Gungwah" nama="Anak Agung Nararya Putra" nim="103012300328" kelas="IF-47-03" role="Frontend" />
          <CardProfile src={Rifaldi} alt="Rifaldi" nama="Muhammad Rifaldi Usman" nim="103012300325" kelas="IF-47-03" role="Backend" />
        </div>
        <div className='text-black text-30 font-light text-center m-2 p-4'>
          <p className='max-w-prose m-auto'> 
            Pada kesempatan hari ini, kami akan menampilkan running time dari hasil pengurutan data anime berdasarkan rating dikali jumlah pengguna memberikan rating.
          </p>
        </div>
        <h1 className='text-black text-xl font-bold text-center m-2 p-4'>Pilih Jumlah Data</h1>
            <div className="grid grid-cols-3 gap-4 mt-6 mb-4">
                <button onClick={() => generateAnimeList(100)} className="bg-[#E195AB] text-[#F2F9FF] p-2 rounded">Generate 100 Data</button>
                <button onClick={() => generateAnimeList(500)} className="bg-[#E195AB] text-[#F2F9FF] p-2 rounded">Generate 500 Data</button>
                <button onClick={() => generateAnimeList(1000)} className="bg-[#E195AB] text-[#F2F9FF] p-2 rounded">Generate 1000 Data</button>
                <button onClick={() => generateAnimeList(2500)} className="bg-[#E195AB] text-[#F2F9FF] p-2 rounded">Generate 2500 Data</button>
                <button onClick={() => generateAnimeList(5000)} className="bg-[#E195AB] text-[#F2F9FF] p-2 rounded">Generate 5000 Data</button>
                <button onClick={() => generateAnimeList(7500)} className="bg-[#E195AB] text-[#F2F9FF] p-2 rounded">Generate 7500 Data</button>
                <button onClick={() => generateAnimeList(10000)} className="bg-[#E195AB] text-[#F2F9FF] p-2 rounded">Generate 10000 Data</button>
                <button onClick={() => generateAnimeList(12500)} className="bg-[#E195AB] text-[#F2F9FF] p-2 rounded">Generate 12500 Data</button>
                <button onClick={() => generateAnimeList(15000)} className="bg-[#E195AB] text-[#F2F9FF] p-2 rounded">Generate 15000 Data</button>
            </div>
            <div className="grid place-items-center grid-cols-1 gap-4 h-min mt-4 mb-10">
                <button onClick={() => generateAnimeList(17500)} className="bg-[#E195AB] text-[#F2F9FF] p-2 rounded w-[32.8%]">Generate 17500 Data</button>
            </div>
            <div className='flex items-center justify-center h-min w-1/2'>
                    <h1 className='text-black text-xl font-bold text-center m-2 p-4'>Pilih Jenis Algoritma</h1>
                </div>
            <div className="flex items-center justify-center h-min w-1/2 gap-x-20">
                <button onClick={sortIterative} className="bg-gradient-to-r from-rose-400 via-fuchsia-400 to-pink-500 text-white p-2 rounded mr-2">Sort Iterative</button>
                <button onClick={sortRecursive} className="bg-gradient-to-r from-red-400 via-rose-500 to-pink-400 text-white p-2 rounded">Sort Recursive</button>
            </div>
            <div className="flex mt-4 mb-4">
                <div className="flex-1">
                    <p className='text-black text-30 font-light text-center'>Jumlah Data: {dataCount}</p>
                    <p className='text-black text-30 font-light'>Daftar Anime:</p>
                    <table className="min-w-full border-collapse border border-pink-500 border-width-2">
                        <thead>
                            <tr>
                                <th className="border border-pink-500 bg-[#FFF5D7] p-2">Nama</th>
                                <th className="border border-pink-500 bg-[#FFF5D7] p-2">Rating</th>
                            </tr>
                        </thead>
                        <tbody>
                            {animeList.map((anime, index) => (
                                <tr key={index}>
                                    <td className="border border-pink-500 bg-[#F2F9FF] p-2">{anime.nama}</td>
                                    <td className="border border-pink-500  bg-[#F2F9FF] p-2">{anime.rating}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex-1 pl-4">
                    <p className='text-black text-30 font-light'>{executionTime}</p>
                    <Line data={data} />
                    {sortedAnimeList.length > 0 && (
                        <>
                            <p className="text-black text-30 font-light mt-4">Sorted Anime List:</p>
                            <table className="min-w-full border-collapse border border-pink-500 ">
                                <thead>
                                    <tr>
                                        <th className="border border-pink-500 bg-[#FFF5D7]  p-2">Nama</th>
                                        <th className="border border-pink-500  bg-[#FFF5D7] p-2">Rating</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sortedAnimeList.map((anime, index) => (
                                        <tr key={index}>
                                            <td className="border border-pink-500  bg-[#F2F9FF] p-2">{anime.nama}</td>
                                            <td className="border border-pink-500  bg-[#F2F9FF]p-2">{anime.rating}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </div>
            </div>
            <div className="flex items-center justify-center h-20 top-0 w-full bg-gradient-to-r from-rose-400 via-pink-500 to-fuchsia-300">
                <h1 className="text-xl font-bold text-white">Terima Kasih Telah Menggunakan Program Kami</h1>
            </div>
        </div>
    );
};

export default AnimeSort;