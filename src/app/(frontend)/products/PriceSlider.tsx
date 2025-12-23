// PriceSlider.tsx
// A client component that renders a double-range slider for selecting a price range.
// It displays the selected min and max values and applies the filter via router.push.

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

interface PriceSliderProps {
  minDefault: number
  maxDefault: number
  minCurrent?: number
  maxCurrent?: number
  baseQuery: string
}

export default function PriceSlider({
  minDefault,
  maxDefault,
  minCurrent,
  maxCurrent,
  baseQuery,
}: PriceSliderProps) {
  const router = useRouter()
  // Initialize state with current values or defaults
  const [minVal, setMinVal] = useState<number>(minCurrent ?? minDefault)
  const [maxVal, setMaxVal] = useState<number>(maxCurrent ?? maxDefault)

  // Determine which slider should be on top.  When the min value is greater than
  // halfway through the range, lower its z‑index so that the max handle is
  // easier to select.  This heuristic helps ensure both thumbs remain
  // reachable as they move across the track.
  const threshold = minDefault + (maxDefault - minDefault) / 2
  const minZIndex = minVal > threshold ? 2 : 3
  const maxZIndex = minZIndex === 3 ? 2 : 3

  // Ensure minVal does not exceed maxVal and vice versa
  const handleMinChange = (value: number) => {
    if (value <= maxVal) {
      setMinVal(value)
    }
  }
  const handleMaxChange = (value: number) => {
    if (value >= minVal) {
      setMaxVal(value)
    }
  }

  const applyFilter = () => {
    const params = new URLSearchParams(baseQuery)
    params.set('minPrice', Math.floor(minVal).toString())
    params.set('maxPrice', Math.ceil(maxVal).toString())
    router.push(`/products?${params.toString()}`)
  }

  return (
    <>
      <div className="flex flex-col gap-2 w-full">
        {/* Slider container */}
        <div className="relative h-6 flex items-center w-full">
        {/* Track */}
        <div className="absolute w-full h-0.5 bg-gray-300 rounded-full pointer-events-none" />
        {/* Highlighted range between the two thumbs */}
        <div
          className="absolute h-0.5 bg-gray-900 rounded-full pointer-events-none"
          style={{
            left: `${((minVal - minDefault) / (maxDefault - minDefault)) * 100}%`,
            width: `${((maxVal - minDefault) / (maxDefault - minDefault)) * 100 - ((minVal - minDefault) / (maxDefault - minDefault)) * 100}%`,
          }}
        />
        {/* Range inputs */}
        <input
          type="range"
          min={minDefault}
          max={maxDefault}
          value={minVal}
          onChange={(e) => handleMinChange(Number(e.target.value))}
          className="range-input absolute w-full bg-transparent"
          style={{ zIndex: minZIndex }}
        />
        <input
          type="range"
          min={minDefault}
          max={maxDefault}
          value={maxVal}
          onChange={(e) => handleMaxChange(Number(e.target.value))}
          className="range-input absolute w-full bg-transparent"
          style={{ zIndex: maxZIndex }}
        />
        {/* Remove custom slider thumbs.  We rely on the native range inputs for
            dragging.  The inputs themselves expose the handles which users
            interact with.  The highlight bar still provides a visual cue
            between the selected min and max values. */}
        </div>
        {/* Value labels */}
        <div className="flex justify-between text-xs text-gray-600">
          <span>${Math.floor(minVal)}</span>
          <span>${Math.ceil(maxVal)}</span>
        </div>
        {/* Apply button */}
        <button
          type="button"
          onClick={applyFilter}
          className="self-end px-3 py-1.5 bg-gray-900 text-white rounded text-sm hover:bg-orange-500 transition-colors"
        >
          Apply
        </button>
      </div>
      {/* Slider input styling */}
      <style jsx>{`
        .range-input {
          pointer-events: none;
          -webkit-appearance: none;
        }
        .range-input::-webkit-slider-thumb {
          pointer-events: all;
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background: #111827;
          border-radius: 9999px;
          border: 2px solid white;
          cursor: pointer;
        }
        .range-input::-moz-range-thumb {
          pointer-events: all;
          width: 16px;
          height: 16px;
          background: #111827;
          border-radius: 9999px;
          border: 2px solid white;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}