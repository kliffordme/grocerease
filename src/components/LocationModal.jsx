import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LocationPicker from './LocationPicker';
import {
  selectLocationModalOpen,
  selectCoordinates,
  closeLocationModal,
  setLocation,
} from '../redux/globalSlice';

function LocationModal() {
  const isOpen = useSelector(selectLocationModalOpen);
  const coordinates = useSelector(selectCoordinates);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') dispatch(closeLocationModal());
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, dispatch]);

  if (!isOpen) return null;

  const handleConfirm = (payload) => {
    dispatch(setLocation(payload));
    dispatch(closeLocationModal());
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 cursor-pointer"
      onClick={() => dispatch(closeLocationModal())}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl p-5 max-h-[90vh] overflow-y-auto cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-800">Delivery location</h2>
          <button
            onClick={() => dispatch(closeLocationModal())}
            className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <LocationPicker initialCoordinates={coordinates} onConfirm={handleConfirm} />
      </div>
    </div>
  );
}

export default LocationModal;
