import React from 'react';
import './index.scss';

function GoodsBottom({ buyNow }) {
    return (<div className="goods-bottom">
        <ul className="goods-bottom-left">
            <li>
                <svg t="1592031535126" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5466"><path d="M749.943467 512.546133H715.776c-15.803733 0-68.369067-2.628267-68.369067-52.565333 0-15.803733-10.5472-26.3168-26.282666-26.3168-15.803733 0-26.3168 10.513067-26.3168 26.282667v10.513066c0 42.0864-63.146667 44.714667-76.288 44.714667H484.352c-13.175467 0-76.288-2.628267-76.288-44.714667V462.574933c0-15.7696-10.513067-26.282667-26.282667-26.282666s-26.282667 10.513067-26.282666 26.282666c0 39.458133-34.2016 52.599467-68.4032 52.599467h-31.573334c-36.795733 0-68.369067-31.5392-68.369066-68.369067v-65.7408h631.1936v63.112534a67.925333 67.925333 0 0 1-68.4032 68.369066zM250.299733 223.266133H742.058667l55.227733 105.198934H205.585067l44.714666-105.198934z m618.018134 128.853334l-86.801067-168.277334A27.648 27.648 0 0 0 757.8624 170.666667H231.867733a25.258667 25.258667 0 0 0-23.6544 18.432l-68.4032 170.9056c-5.256533 5.290667-2.628267 18.432-2.628266 21.060266v65.7408c0 65.7408 55.227733 120.968533 121.002666 120.968534h34.167467c39.458133 0 70.997333-13.141333 92.0576-36.795734 21.026133 23.6544 57.856 36.795733 102.570667 36.795734h34.167466c44.714667 0 81.544533-13.141333 102.570667-36.795734 21.060267 21.026133 52.599467 34.167467 92.0576 34.167467h34.167467c65.774933 0 121.002667-55.227733 121.002666-120.968533V375.808c0-2.628267 0-18.432-2.628266-23.688533z m-76.288 247.227733c-15.7696 0-26.282667 10.513067-26.282667 26.282667v160.426666a16.964267 16.964267 0 0 1-15.803733 15.7696H255.522133a16.964267 16.964267 0 0 1-15.7696-15.7696v-160.426666c0-15.7696-10.513067-26.282667-26.282666-26.282667s-26.282667 10.513067-26.282667 26.282667v160.426666c0 36.829867 31.5392 68.369067 68.334933 68.369067h494.421334c36.864 0 68.4032-31.5392 68.4032-68.369067v-160.426666c0-15.7696-10.513067-26.282667-26.282667-26.282667z" p-id="5467" fill="#666666"></path></svg>
                <p>店铺</p>
            </li>
            <li>
                <svg t="1592032580977" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="6320"><path d="M781.443 514.238c0-73.113-29.837-138.777-77.608-186.546-46.25-47.75-111.914-77.605-183.548-77.605-73.112 0-137.299 29.855-185.046 77.605-47.772 47.77-76.109 113.433-76.109 186.546 0 71.632 28.337 137.297 76.109 185.064 47.747 49.249 111.934 77.588 185.046 77.588 71.634 0 137.297-28.34 183.548-77.588 47.77-47.767 77.608-113.432 77.608-185.064M520.286 750.03c-64.166 0-123.878-26.864-165.657-70.14-41.777-41.777-68.658-101.468-68.658-165.653 0-65.665 26.88-125.356 68.658-167.135 41.779-43.275 101.492-70.135 165.657-70.135 64.164 0 122.378 26.86 164.157 70.135 41.778 41.779 68.66 101.47 68.66 167.135 0 64.185-26.882 123.876-68.66 165.653-41.779 43.277-99.992 70.14-164.157 70.14" p-id="6321" fill="#666666"></path><path d="M574.007 642.588c-17.892 7.47-38.784 10.443-58.195 10.443-19.41-1.497-38.803-5.972-56.716-14.918-44.753-22.385-77.584-68.66-77.584-135.821h-28.378c0 79.107 40.302 134.323 92.545 161.183 22.385 10.448 46.25 16.415 70.134 17.913 22.39 0 46.254-4.471 68.639-13.44 52.242-23.864 92.544-76.107 98.496-164.159l-28.34-1.497c-4.493 76.13-38.823 120.886-80.601 140.296" p-id="6322" fill="#666666"></path><path d="M876.657 430.921c-16.622-83.027-61.21-154.217-123.554-203.2-65.665-53.742-147.741-83.578-232.817-85.076-43.278 0-83.556 5.969-120.883 17.914-73.109 23.864-132.822 71.632-174.6 132.82-28.34 40.282-49.227 88.054-59.692 137.303-137.3 11.918-135.803 189.516 13.438 211.906l26.86-8.946c-14.935-41.8-20.887-85.076-20.887-126.854 1.497-73.134 23.882-141.772 62.666-196.992 38.804-56.715 94.02-99.99 161.183-122.378C442.68 175.476 480.007 171 520.287 171c79.103 1.498 155.21 29.837 214.923 77.605 58.174 46.254 99.972 111.918 114.89 189.523 0 0 64.51 276.212-220.066 387.886-6.074-7.226-14.857-11.801-24.672-11.801-19.415 0-34.331 14.918-34.331 34.307 0 17.914 14.916 32.833 34.33 32.833 16.252 0 29.897-12.328 32.325-27.995 132.762-51.554 196.18-136.102 224.883-216.076C988.47 605.97 990.696 455.72 876.657 430.921" p-id="6323" fill="#666666"></path></svg>
                <p>客服</p>
            </li>
            <li>
            <svg t="1592032689759" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10337"><path d="M512 921.6a64 64 0 0 1-40.32-14.08l-134.826667-106.666667C147.413333 649.813333 69.333333 556.373333 48.64 455.253333a290.986667 290.986667 0 0 1 52.053333-232.533333A279.466667 279.466667 0 0 1 512 183.04a278.4 278.4 0 0 1 188.16-72.32A281.6 281.6 0 0 1 981.333333 391.893333c0 131.2-71.466667 230.186667-293.973333 407.893334l-134.4 106.666666a64 64 0 0 1-40.96 15.146667z m-189.013333-725.333333h-16.213334a190.08 190.08 0 0 0-138.24 77.013333 205.013333 205.013333 0 0 0-36.266666 164.693333c13.226667 64 62.293333 140.16 257.92 295.68L512 830.506667l121.813333-97.28C832 576 896 491.946667 896 391.893333A195.84 195.84 0 0 0 558.933333 256a67.2 67.2 0 0 1-94.08 0 195.413333 195.413333 0 0 0-141.44-59.733333z" fill="#666666" p-id="10338"></path><path d="M213.333333 480a42.666667 42.666667 0 0 1-42.666666-42.666667 202.026667 202.026667 0 0 1 153.813333-196.693333 42.666667 42.666667 0 1 1 21.333333 82.773333A117.12 117.12 0 0 0 256 437.333333a42.666667 42.666667 0 0 1-42.666667 42.666667z" fill="#666666" p-id="10339"></path></svg>
                <p>收藏</p>
            </li>
        </ul>
        <div className="goods-bottom-right">
            <button onClick={buyNow}>购买</button>
        </div>
    </div>)
}

export default GoodsBottom;