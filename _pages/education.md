---
title: "Education"
permalink: /education/
author_profile: true
---

<style>
.education-timeline {
  max-width: 900px;
  margin: 2rem auto;
  padding: 2rem 0;
}

.education-item {
  background: #1a1a1a;
  border-left: 4px solid #ff6c60;
  padding: 2rem;
  margin-bottom: 3rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(255, 108, 96, 0.1);
  transition: all 0.3s ease;
}

.education-item:hover {
  transform: translateX(8px);
  box-shadow: 0 6px 16px rgba(255, 108, 96, 0.2);
  border-left-width: 6px;
}

.education-header {
  margin-bottom: 1.5rem;
}

.institution-name {
  font-size: 1.8em;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 0.5rem;
}

.degree-title {
  font-size: 1.3em;
  font-weight: 600;
  color: #ff6c60;
  margin-bottom: 0.5rem;
}

.education-meta {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  color: #cccccc;
  font-size: 0.95em;
  margin-top: 0.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-icon {
  color: #ff6c60;
}

.rank-badge {
  display: inline-block;
  background: linear-gradient(135deg, #ff6c60, #ff8a80);
  color: #ffffff;
  padding: 0.3rem 1rem;
  border-radius: 20px;
  font-size: 0.9em;
  font-weight: 600;
  margin-left: 1rem;
}

.coursework-section {
  margin-top: 2rem;
  padding-top: 1.5rem;
  border-top: 1px solid #333333;
}

.coursework-title {
  font-size: 1.1em;
  font-weight: 600;
  color: #ffffff;
  margin-bottom: 1rem;
}

.coursework-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 0.8rem;
}

.course-item {
  background: #0a0a0a;
  padding: 0.8rem 1rem;
  border-radius: 6px;
  color: #ffffff;
  font-size: 0.95em;
  border-left: 3px solid #ff6c60;
  transition: all 0.2s ease;
}

.course-item:hover {
  background: #2a2a2a;
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .education-timeline {
    padding: 1rem;
  }
  
  .education-item {
    padding: 1.5rem;
  }
  
  .institution-name {
    font-size: 1.4em;
  }
  
  .degree-title {
    font-size: 1.1em;
  }
  
  .coursework-grid {
    grid-template-columns: 1fr;
  }
}
</style>

<div class="education-timeline">

  <div class="education-item">
    <div class="education-header">
      <h2 class="institution-name">Paris Dauphine University – PSL</h2>
      <div class="degree-title">MSc in Financial Engineering – Quantitative Finance Track (Program 272)</div>
      <div class="education-meta">
        <span class="meta-item">
          <span class="meta-icon">📍</span>
          Paris, France
        </span>
        <span class="meta-item">
          <span class="meta-icon">📅</span>
          Sep 2025 – Jun 2026
        </span>
      </div>
    </div>
    
    <div class="coursework-section">
      <div class="coursework-title">Relevant Coursework</div>
      <div class="coursework-grid">
        <div class="course-item">Stochastic Calculus</div>
        <div class="course-item">Derivatives Pricing</div>
        <div class="course-item">Volatility Modeling</div>
        <div class="course-item">Interest Rate Products</div>
        <div class="course-item">Quantitative Portfolio Management</div>
        <div class="course-item">Algorithmic Trading (Python/C++)</div>
        <div class="course-item">Machine Learning for Finance</div>
        <div class="course-item">Time Series Analysis</div>
      </div>
    </div>
  </div>

  <div class="education-item">
    <div class="education-header">
      <h2 class="institution-name">EPF Graduate School of Engineering</h2>
      <div class="degree-title">
        Master in Computer Science – Data & AI Track
        <span class="rank-badge">Rank: 8/157</span>
      </div>
      <div class="education-meta">
        <span class="meta-item">
          <span class="meta-icon">📍</span>
          Paris, France
        </span>
        <span class="meta-item">
          <span class="meta-icon">📅</span>
          Sep 2020 – Jun 2025
        </span>
      </div>
    </div>
    
    <div class="coursework-section">
      <div class="coursework-title">Relevant Coursework</div>
      <div class="coursework-grid">
        <div class="course-item">Probability & Statistics</div>
        <div class="course-item">Linear Algebra</div>
        <div class="course-item">Numerical Optimization</div>
        <div class="course-item">Algorithms & Data Structures</div>
        <div class="course-item">Time Series Analysis</div>
        <div class="course-item">Databases</div>
        <div class="course-item">Machine Learning</div>
        <div class="course-item">Deep Learning</div>
      </div>
    </div>
  </div>

</div>
