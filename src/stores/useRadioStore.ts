import { create } from "zustand";
import { Station } from "../utils/types";

interface RadioStore {
  stations: Station[];
  selectedStation: string | null;
  favoriteStations: Station[];
  playing: boolean;
  modalIsOpen: boolean;
  editingStation: Station | null;
  editedName: string;
  editedCountry: string;
  editedTags: string;

  setStations: (stations: Station[]) => void;
  setSelectedStation: (url: string | null) => void;
  addToFavorites: (station: Station) => void;
  removeFromFavorites: (stationId: string) => void;
  togglePlay: () => void;
  handleStationSelection: (stationUrl: string) => void;
  openEditModal: (station: Station) => void;
  handleEditSave: () => void;
  setModalIsOpen: (isOpen: boolean) => void;
  setEditedName: (name: string) => void;
  setEditedCountry: (country: string) => void;
  setEditedTags: (tags: string) => void;
  isFavorite: (stationUrl: string) => boolean;
  searchTerm: string;
  currentPage: number;
  setSearchTerm: (term: string) => void;
  setCurrentPage: (page: number) => void;
}

export const useRadioStore = create<RadioStore>((set, get) => ({
  stations: [],
  selectedStation: null,
  favoriteStations: [],
  playing: false,
  modalIsOpen: false,
  editingStation: null,
  editedName: "",
  editedCountry: "",
  editedTags: "",

  setStations: (stations) => set({ stations }),

  setSelectedStation: (url) => set({ selectedStation: url }),

  addToFavorites: (station) => {
    const { favoriteStations } = get();
    const stationExists = favoriteStations.some(
      (favStation) => favStation.url_resolved === station.url_resolved,
    );

    if (!stationExists) {
      const newStation = {
        ...station,
        id: `${station.id}-${Date.now()}`,
      };
      set({ favoriteStations: [...favoriteStations, newStation] });
    }
  },

  removeFromFavorites: (stationId) => {
    const { favoriteStations } = get();
    set({
      favoriteStations: favoriteStations.filter(
        (station) => station.id !== stationId,
      ),
    });
  },

  togglePlay: () => {
    const audio = document.getElementById("radioPlayer") as HTMLAudioElement;
    if (!audio) return;

    const { playing } = get();
    if (playing) {
      audio.pause();
      set({ playing: false });
    } else {
      audio.play();
      set({ playing: true });
    }
  },

  handleStationSelection: (stationUrl) => {
    const audio = document.getElementById("radioPlayer") as HTMLAudioElement;
    const { selectedStation } = get();
    if (audio && selectedStation) {
      audio.pause();
    }
    set({
      selectedStation: stationUrl,
      playing: true,
    });
  },

  openEditModal: (station) => {
    set({
      editingStation: station,
      editedName: station.name,
      editedCountry: station.country || "",
      editedTags: station.tags || "",
      modalIsOpen: true,
    });
  },

  handleEditSave: () => {
    const {
      editingStation,
      editedName,
      editedCountry,
      editedTags,
      favoriteStations,
    } = get();
    if (!editingStation) return;

    const updatedFavorites = favoriteStations.map((station) =>
      station.id === editingStation.id
        ? {
            ...station,
            name: editedName,
            country: editedCountry,
            tags: editedTags,
          }
        : station,
    );

    set({
      favoriteStations: updatedFavorites,
      modalIsOpen: false,
    });
  },

  setModalIsOpen: (isOpen) => set({ modalIsOpen: isOpen }),
  setEditedName: (name) => set({ editedName: name }),
  setEditedCountry: (country) => set({ editedCountry: country }),
  setEditedTags: (tags) => set({ editedTags: tags }),
  isFavorite: (stationUrl) => {
    const { favoriteStations } = get();
    return favoriteStations.some(
      (station) => station.url_resolved === stationUrl,
    );
  },
  searchTerm: '',
  currentPage: 1,
  setSearchTerm: (term) => set({ searchTerm: term }),
  setCurrentPage: (page) => set({ currentPage: page }),
}));
