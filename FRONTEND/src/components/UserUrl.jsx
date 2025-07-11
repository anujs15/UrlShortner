import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getAllUserUrls } from '../api/user.api'

const UserUrl = () => {
  const { data: urls, isLoading, isError, error } = useQuery({
    queryKey: ['userUrls'],
    queryFn: getAllUserUrls,
    refetchInterval: 30000, // Refetch every 30 seconds to update click counts
    staleTime: 0, // Consider data stale immediately so it refetches when invalidated
  })
  const [copiedId, setCopiedId] = useState(null)
  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => {
      setCopiedId(null)
    }, 2000)
  }

  if (isLoading) {
    return (
      <div className="flex justify-center my-8 fade-in">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-500 mt-3">Loading your URLs...</p>
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md my-4 fade-in">
        <div className="flex">
          <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p>Error loading your URLs: {error.message}</p>
        </div>
      </div>
    )
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center text-gray-500 my-6 p-6 bg-gray-50 rounded-lg border border-gray-200 fade-in">
        <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
        </svg>
        <p className="text-xl font-medium text-gray-600">No URLs found</p>
        <p className="mt-2 text-gray-500">You haven't created any shortened URLs yet.</p>
        <p className="mt-4">
          <a href="#" className="text-blue-500 hover:text-blue-700 inline-flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            Create your first short URL
          </a>
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg mt-5 shadow-sm border border-gray-100 overflow-hidden fade-in">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-3 flex items-center">
        <svg className="h-5 w-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
        </svg>
        <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider">Your Recent Links</h3>
        <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
          {urls.urls.length}
        </span>
      </div>
      
      <div className="overflow-x-auto max-h-96">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Original URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Short URL
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Clicks
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {urls.urls.reverse().map((url) => (
              <tr key={url._id} className="hover:bg-blue-50 transition-colors duration-150">
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 truncate max-w-xs">
                    {url.full_url}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm">
                   <a 
                      href={`${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/${url.short_url}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-900 hover:underline font-medium">
                      {`${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/${url.short_url}`}
                   </a>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {url.clicks} {url.clicks === 1 ? 'click' : 'clicks'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  <button
                   onClick={() => handleCopy(`${import.meta.env.VITE_API_URL.replace(/\/$/, '')}/${url.short_url}`, url._id)}
                    className={`inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md shadow-sm transition-all duration-200 ${
                      copiedId === url._id
                        ? 'bg-green-500 text-white hover:bg-green-600'
                        : 'bg-blue-500 text-white hover:bg-blue-600'
                    } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500`}
                  >
                    {copiedId === url._id ? (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                        </svg>
                        Copy URL
                      </>
                    )}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserUrl