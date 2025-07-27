import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

function Carousel({ cards = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200)
  const carouselRef = useRef(null)
  
  const getVisibleCards = () => {
    if (windowWidth < 640) return 1
    if (windowWidth < 1024) return 2
    return 3
  }
  
  const visibleCards = getVisibleCards()
  const maxIndex = Math.max(0, cards.length - visibleCards)
  
  const next = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex))
  }
  
  const prev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0))
  }
  
  const formatDate = (index) => {
    const today = new Date()
    today.setDate(today.getDate() + index)
    const day = today.getDate()
    const month = today.toLocaleString('default', { month: 'long' })
    
    const suffix = day === 1 || day === 21 || day === 31 
      ? 'st' : day === 2 || day === 22 
      ? 'nd' : day === 3 || day === 23 
      ? 'rd' : 'th'
      
    return `${day}${suffix} ${month}`
  }

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  return (
    <div className="relative w-full py-4">
      {/* <button 
        onClick={prev}
        disabled={currentIndex === 0}
        className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 z-10 bg-white rounded-full shadow-md p-2 disabled:opacity-30"
      >
        <ChevronLeft className="h-6 w-6" />
      </button> */}
      
      <div className="overflow-hidden" ref={carouselRef}>
        <div 
          className="flex transition-transform duration-300 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
        >
          {cards.map((card, index) => (
            <div 
              key={index}
              className="w-full"
              style={{ flex: `0 0 ${100 / visibleCards}%`, padding: '0 8px' }}
            >
              <div className="border rounded-lg shadow-sm h-full bg-white overflow-hidden flex flex-col">
                <div className="p-2 bg-gray-50 border-b text-sm font-medium text-gray-700">
                  {formatDate(index)}
                </div>
                
                <div className="flex-grow p-3">
                  {card}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* <button 
        onClick={next}
        disabled={currentIndex >= maxIndex}
        className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 z-10 bg-white rounded-full shadow-md p-2 disabled:opacity-30"
      >
        <ChevronRight className="h-6 w-6" />
      </button> */}
    </div>
  )
}

export default Carousel