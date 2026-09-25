/**
 * SMART METRO - Main Application
 * “Smarter Travel. A Better Tomorrow.”
 * Prototype for Pune Metro System.
 */

import React, { useState } from 'react';
import { SplashScreen } from './screens/SplashScreen';
import { HomeScreen } from './screens/HomeScreen';
import { JourneyPlannerScreen } from './screens/JourneyPlannerScreen';
import { RouteResultScreen } from './screens/RouteResultScreen';
import { StationDetailsScreen } from './screens/StationDetailsScreen';
import { LiveMetroScreen } from './screens/LiveMetroScreen';
import { TicketInfoScreen } from './screens/TicketInfoScreen';
import { ProfileScreen } from './screens/ProfileScreen';
import { StationMapScreen } from './screens/StationMapScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { HelpSupportScreen } from './screens/HelpSupportScreen';
import { StationsListScreen } from './screens/StationsListScreen';
import { SavedRoutesScreen } from './screens/SavedRoutesScreen';
import { MyTicketsScreen } from './screens/MyTicketsScreen';
import { AiJourneyAssistantScreen } from './screens/AiJourneyAssistantScreen';

import { Header } from './components/Header';
import { BottomNav, TabType } from './components/BottomNav';
import { SideDrawer } from './components/SideDrawer';
import { StationSelectModal } from './components/StationSelectModal';
import { SimulatedTicketModal } from './components/SimulatedTicketModal';
import { AboutProjectModal } from './components/AboutProjectModal';

import {
  STATIONS,
  MetroStation,
  PlannedRoute,
  calculateRoute,
  DEFAULT_SAVED_ROUTES,
  SavedRoute,
  DigitalTicket,
  TicketType
} from './data/metroData';

export default function App() {
  // Navigation & Screen State
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState<string>('home');
  const [navigationHistory, setNavigationHistory] = useState<string[]>(['home']);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  // Selected Stations & Route state - INITIALLY NULL (No pre-selected values)
  const [fromStation, setFromStation] = useState<MetroStation | null>(null);
  const [toStation, setToStation] = useState<MetroStation | null>(null);
  const [selectedStationDetails, setSelectedStationDetails] = useState<MetroStation>(STATIONS[9]); // District Court Pune
  const [currentRoute, setCurrentRoute] = useState<PlannedRoute>(
    calculateRoute('pcmc', 'ramwadi', 'Fastest')
  );

  // Modal states
  const [stationSelectType, setStationSelectType] = useState<'from' | 'to' | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [activeDigitalTicket, setActiveDigitalTicket] = useState<DigitalTicket | null>(null);

  // Saved routes state
  const [savedRoutes, setSavedRoutes] = useState<SavedRoute[]>(DEFAULT_SAVED_ROUTES);

  // Navigate to screen with history tracking
  const navigateTo = (screen: string) => {
    setNavigationHistory((prev) => [...prev, screen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Back Navigation
  const handleBack = () => {
    if (navigationHistory.length > 1) {
      const newHistory = [...navigationHistory];
      newHistory.pop();
      const prevScreen = newHistory[newHistory.length - 1] || 'home';
      setNavigationHistory(newHistory);
      setCurrentScreen(prevScreen);
    } else {
      setCurrentScreen('home');
    }
  };

  // Tab mapping for bottom nav
  const getActiveTab = (): TabType => {
    if (currentScreen === 'home') return 'home';
    if (currentScreen === 'journey-planner' || currentScreen === 'route-result' || currentScreen === 'ai-assistant')
      return 'journey';
    if (currentScreen === 'stations' || currentScreen === 'station-details' || currentScreen === 'station-map')
      return 'stations';
    if (currentScreen === 'profile' || currentScreen === 'my-tickets' || currentScreen === 'saved-routes')
      return 'profile';
    return 'home';
  };

  const handleTabChange = (tab: TabType) => {
    if (tab === 'home') navigateTo('home');
    else if (tab === 'journey') navigateTo('journey-planner');
    else if (tab === 'stations') navigateTo('stations');
    else if (tab === 'profile') navigateTo('profile');
  };

  // Station swapping
  const handleSwapStations = () => {
    const temp = fromStation;
    setFromStation(toStation);
    setToStation(temp);
  };

  // Find Route handler
  const handleFindRoute = (preference: 'Fastest' | 'Least Fare' | 'Less Transfers' = 'Fastest') => {
    if (!fromStation || !toStation) {
      if (!fromStation) setStationSelectType('from');
      else setStationSelectType('to');
      return;
    }
    const computed = calculateRoute(fromStation.id, toStation.id, preference);
    setCurrentRoute(computed);
    navigateTo('route-result');
  };

  // Save Route handler
  const handleSaveRoute = (route: PlannedRoute) => {
    const alreadySaved = savedRoutes.some(
      (sr) => sr.fromStationId === route.fromStation.id && sr.toStationId === route.toStation.id
    );
    if (!alreadySaved) {
      const newSaved: SavedRoute = {
        id: `sr-${Date.now()}`,
        title: `${route.fromStation.name} to ${route.toStation.name}`,
        fromStationId: route.fromStation.id,
        toStationId: route.toStation.id,
        duration: `${route.durationMinutes} min`,
        fare: `₹${route.fareRupees}`,
        tag: 'Work'
      };
      setSavedRoutes((prev) => [newSaved, ...prev]);
    }
  };

  const handleRemoveSavedRoute = (id: string) => {
    setSavedRoutes((prev) => prev.filter((r) => r.id !== id));
  };

  // Screen Title for header
  const getScreenTitle = (): string => {
    switch (currentScreen) {
      case 'home':
        return 'Smart Metro';
      case 'journey-planner':
        return 'Plan Journey';
      case 'ai-assistant':
        return 'AI Assistant';
      case 'route-result':
        return 'Route Details';
      case 'station-details':
        return 'Station Details';
      case 'live-metro':
        return 'Live Metro';
      case 'ticket-info':
        return 'Ticket & Fares';
      case 'profile':
        return 'Profile';
      case 'station-map':
        return 'Station Map';
      case 'settings':
        return 'Settings';
      case 'help-support':
        return 'Help & Support';
      case 'stations':
        return 'Stations';
      case 'saved-routes':
        return 'Saved Routes';
      case 'my-tickets':
        return 'My Tickets';
      default:
        return 'Smart Metro';
    }
  };

  const isSubScreen = currentScreen !== 'home';

  // Splash Screen view
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center selection:bg-[#008C8C]/30">
      {/* Mobile-First Frame Container */}
      <div className="relative w-full max-w-[430px] min-h-screen bg-[#F7FAFC] shadow-2xl flex flex-col">
        {/* Persistent App Header */}
        <Header
          title={getScreenTitle()}
          showBack={isSubScreen}
          onBack={handleBack}
          onOpenDrawer={() => setIsDrawerOpen(true)}
          onOpenAbout={() => setIsAboutModalOpen(true)}
        />

        {/* Screen Switcher */}
        <main className="flex-1 overflow-x-hidden">
          {currentScreen === 'home' && (
            <HomeScreen
              fromStation={fromStation}
              toStation={toStation}
              onOpenStationSelect={(type) => setStationSelectType(type)}
              onSwapStations={handleSwapStations}
              onFindRoute={() => handleFindRoute('Fastest')}
              onNavigate={(screen) => navigateTo(screen)}
              onSelectStationDetails={(st) => {
                setSelectedStationDetails(st);
                navigateTo('station-details');
              }}
              onOpenAiAssistant={() => navigateTo('ai-assistant')}
            />
          )}

          {currentScreen === 'journey-planner' && (
            <JourneyPlannerScreen
              fromStation={fromStation}
              toStation={toStation}
              onOpenStationSelect={(type) => setStationSelectType(type)}
              onClearStation={(type) => {
                if (type === 'from') setFromStation(null);
                else setToStation(null);
              }}
              onSwapStations={handleSwapStations}
              onFindRoute={handleFindRoute}
            />
          )}

          {currentScreen === 'ai-assistant' && (
            <AiJourneyAssistantScreen
              selectedFrom={fromStation}
              selectedTo={toStation}
              onOpenStationSelect={(type) => setStationSelectType(type)}
              onSwapStations={handleSwapStations}
              onViewDetailedRoute={(route) => {
                setCurrentRoute(route);
                navigateTo('route-result');
              }}
            />
          )}

          {currentScreen === 'route-result' && (
            <RouteResultScreen
              route={currentRoute}
              onViewMap={() => navigateTo('station-map')}
              onBuyTicket={() => {
                setActiveDigitalTicket({
                  id: `TKT-${Math.floor(1000 + Math.random() * 9000)}-PUN`,
                  type: 'Single Journey Pass',
                  fromStation: currentRoute.fromStation.name,
                  toStation: currentRoute.toStation.name,
                  fare: currentRoute.fareRupees,
                  purchasedAt: 'Just now',
                  validUntil: 'Valid for 120 mins',
                  qrCodeValue: `SMARTMETRO-LIVE-${currentRoute.fromStation.id}-${currentRoute.toStation.id}`,
                  bookingRef: `SM${Math.floor(2000000 + Math.random() * 900000)}`,
                  status: 'ACTIVE',
                  passenger: 'Avani'
                });
                setIsTicketModalOpen(true);
              }}
              onSaveRoute={handleSaveRoute}
              isSaved={savedRoutes.some(
                (sr) =>
                  sr.fromStationId === currentRoute.fromStation.id &&
                  sr.toStationId === currentRoute.toStation.id
              )}
            />
          )}

          {currentScreen === 'station-details' && (
            <StationDetailsScreen
              station={selectedStationDetails}
              onOpenMap={() => navigateTo('station-map')}
              onPlanFromStation={(st) => {
                setFromStation(st);
                navigateTo('journey-planner');
              }}
            />
          )}

          {currentScreen === 'live-metro' && (
            <LiveMetroScreen
              onSelectStation={(st) => {
                setSelectedStationDetails(st);
                navigateTo('station-details');
              }}
              onViewAllStations={() => navigateTo('stations')}
            />
          )}

          {currentScreen === 'ticket-info' && (
            <TicketInfoScreen
              onNavigateToPlanner={() => navigateTo('journey-planner')}
              onOpenSimulatedTicket={(ticketType?: TicketType) => {
                setActiveDigitalTicket({
                  id: `TKT-${Math.floor(1000 + Math.random() * 9000)}-PUN`,
                  type: ticketType?.name || 'Single Journey Pass',
                  fromStation: fromStation ? fromStation.name : 'PCMC',
                  toStation: toStation ? toStation.name : 'Ramwadi',
                  fare: ticketType?.basePrice || 30,
                  purchasedAt: 'Just now',
                  validUntil: ticketType?.validity || 'Valid for 120 mins',
                  qrCodeValue: `SMARTMETRO-${ticketType?.id || 'SINGLE'}-2026`,
                  bookingRef: `SM${Math.floor(2000000 + Math.random() * 900000)}`,
                  status: 'ACTIVE',
                  passenger: 'Avani'
                });
                setIsTicketModalOpen(true);
              }}
            />
          )}

          {currentScreen === 'profile' && (
            <ProfileScreen
              onNavigate={(screen) => navigateTo(screen)}
              onOpenMyTickets={() => navigateTo('my-tickets')}
            />
          )}

          {currentScreen === 'station-map' && (
            <StationMapScreen
              initialStation={selectedStationDetails}
              onSelectStationDetails={(st) => {
                setSelectedStationDetails(st);
                navigateTo('station-details');
              }}
              onPlanFromStation={(st) => {
                setFromStation(st);
                navigateTo('journey-planner');
              }}
            />
          )}

          {currentScreen === 'settings' && (
            <SettingsScreen
              onOpenAbout={() => setIsAboutModalOpen(true)}
              onNavigate={(screen) => navigateTo(screen)}
            />
          )}

          {currentScreen === 'help-support' && <HelpSupportScreen />}

          {currentScreen === 'stations' && (
            <StationsListScreen
              onSelectStation={(st) => {
                setSelectedStationDetails(st);
                navigateTo('station-details');
              }}
              onOpenMap={() => navigateTo('station-map')}
            />
          )}

          {currentScreen === 'saved-routes' && (
            <SavedRoutesScreen
              savedRoutes={savedRoutes}
              onSelectRoute={(from, to) => {
                setFromStation(from);
                setToStation(to);
                const computed = calculateRoute(from.id, to.id, 'Fastest');
                setCurrentRoute(computed);
                navigateTo('route-result');
              }}
              onRemoveRoute={handleRemoveSavedRoute}
              onPlanNew={() => navigateTo('journey-planner')}
            />
          )}

          {currentScreen === 'my-tickets' && (
            <MyTicketsScreen
              onOpenTicketQr={(t) => {
                setActiveDigitalTicket(t);
                setIsTicketModalOpen(true);
              }}
              onBuyNewTicket={() => navigateTo('ticket-info')}
            />
          )}
        </main>

        {/* Persistent Bottom Navigation: HOME, JOURNEY, STATIONS, PROFILE */}
        <BottomNav activeTab={getActiveTab()} onChangeTab={handleTabChange} />

        {/* Side Drawer Component */}
        <SideDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          activeScreen={currentScreen}
          onNavigate={(screen) => navigateTo(screen)}
          onOpenAbout={() => setIsAboutModalOpen(true)}
        />

        {/* Station Selection Modal */}
        <StationSelectModal
          isOpen={stationSelectType !== null}
          onClose={() => setStationSelectType(null)}
          title={stationSelectType === 'from' ? 'Select Starting Station' : 'Select Destination Station'}
          selectedStationId={
            stationSelectType === 'from' ? fromStation?.id : toStation?.id
          }
          onSelectStation={(station) => {
            if (stationSelectType === 'from') {
              setFromStation(station);
            } else if (stationSelectType === 'to') {
              setToStation(station);
            }
            setStationSelectType(null);
          }}
        />

        {/* Digital Simulated QR Ticket Modal */}
        <SimulatedTicketModal
          isOpen={isTicketModalOpen}
          onClose={() => setIsTicketModalOpen(false)}
          ticket={activeDigitalTicket}
        />

        {/* College Project Presentation & About Modal */}
        <AboutProjectModal
          isOpen={isAboutModalOpen}
          onClose={() => setIsAboutModalOpen(false)}
        />
      </div>
    </div>
  );
}
