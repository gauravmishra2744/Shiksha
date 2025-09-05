import React from 'react'
import Navbar from './navbar'
import HeroSection from './hero-section'
import StudentFeaturesComponents from './student-features'
import TeacherFeatures from './teacher-features'
import AboutComponent from './about-component'
import CTA from './cta'
import Footer from './footer'

const Homepage = () => {
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <StudentFeaturesComponents/>
    <TeacherFeatures/>
    <AboutComponent/>
    <CTA/>
    <Footer/>
    </>
  )
}

export default Homepage