import React from 'react'

const SearchLoading = () => {
    return (
        <article className="relative">
            <div className="absolute min-h-full right-1  top-0 flex items-center">
                <div className="min-w-[24px] flex items-center relative justify-center animate-spin  border-s-0 border-t-0  rounded-full min-h-[24px]">
                    <div className="min-h-[2px] animate-spin absolute  bg-black dark:bg-white  min-w-[12px]  rounded-full "></div>
                </div>
            </div>
        </article>
    )
}

export default SearchLoading