---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>
I obtained my MPhil degree in Computer Science and Engineering from The Hong Kong University of Science and Technology (HKUST), where I was advised by Prof. [Sai-Kit Yeung](https://saikit.org/). Prior to that, I earned my B.S. in Computer Science (Advanced Program) with highest distinction (GPA: 3.93/4.0) from the University of Science, VNU - HCM, under the guidance of Prof. [Minh-Triet Tran](https://scholar.google.com/citations?hl=vi&user=lt2ATkkAAAAJ&view_op=list_works&sortby=pubdate).

My research centers on advancing **multimodal understanding**, grounded in a strong background in computer vision, particularly in detection and segmentation. I first delved into these areas during my MPhil at HKUST and later expanded my expertise as an AI Research Engineer at Huawei HKRC, where I contributed to the [MindONE](https://github.com/mindspore-lab/mindone) project, focusing on multimodal and multitask generation models. 

Currently, my work targets the development of **World Foundation Multimodal Models** capable of discovering the underlying physical laws and causal relationships within multimodal data. To achieve this, my research is structured around two interconnected pillars:

- **Egocentric Video Understanding (The Past & Present)**: Enabling AI to interpret human behavior and intent from continuous, first-person sensory data (such as video, sound, touch, and eye gaze). The goal is to build a grounded, queryable memory of events as they happen.

- **Physics-Plausible Video Generation (The Future)**: Moving beyond standard generation to build predictive, causally-consistent world models. This is the essential foundation for robust simulation and long-range planning.


<div style="color: #ff0000; font-weight: bold; font-size: 1.1em; text-align: center; margin: 1em 0; padding: 0.5em; border: 2px solid #ff0000; border-radius: 5px;">
🚀 I'm currently looking for PhD position in Computer Vision 🚀
</div>




# 🔥 News
- *2025.11*: 🎯 **Paper Accepted!** Excited to share that our paper "TransCues" was accepted to WACV 2026 after several attempts. Congratulations to anh Tuan-Anh and all the collaborators on this achievement! 🎉
- *2025.08*: 🚀 **New Role!** I have joined Fulbright University Vietnam as a Research Assistant in Computer Vision, where I am working on Physics-Plausible Video Generation. 
- *2025.06* 🏆 **Best Poster Presentation Award** at [AVSTC](https://avstc.ptit.edu.vn/) - Thrilled to receive this prestigious joint recognition from the Australian Government 🇦🇺, University of Technology Sydney (UTS) 🎓, and PTIT for my research presentation, standing out among **100 participants**! A fantastic validation of my research! ✨
- *2024.11*: 🚀 **New Role!** Excited to announce that I've joined Huawei Hong Kong Research Center as an AI Research Engineer, where I'll be contributing to cutting-edge AIGC (AI-Generated Content) projects. Looking forward to this new journey! 💫
- *2024.10*: 🎯 **Paper Accepted!** My first paper "VATEX" has been accepted to WACV 2025. Thrilled to share that this marks my debut as a co-first author in a top-tier computer vision conference! 🎉


# 💻 Experience

<div class='experience-box'>
<div class='experience-box-text' markdown="1">

- *2025.08 - Current*: Research Assistant in Computer Vision, [Fulbright University Vietnam](https://fulbright.edu.vn/)
  - Conducted research on Video Diffusion Models, focus on Physical Plausibility of Video Generation
  - Host weekly meeting and research seminar in our CV group.
  - Assist junior student in Capstone and Thesis project on Computer Vision.

- *2024.11 - 2025.04*: **AI Research Engineer** at [Huawei Hong Kong Research Center](https://www.huawei.com/en/corporate-information/research-development)
  - Contributing to [MindONE](https://github.com/mindspore-lab/mindone) project, focusing on multimodal/multitask generation models and optimizing it on Ascend NPU.

- *2022.03 - 2022.07*: **Research Resident** (Batch 7) at [VinAI Research](https://vinai.io/) (now part of Qualcomm)
  - Conducted research in spatio-temporal tasks: video instance/panoptic segmentation, 4D point cloud panoptic segmentation.

- *2021.03 - 2021.11*: **Research Intern** at [Vinbrain](https://vinbrain.net/) (now acquired by NVIDIA)
  - Worked on medical image processing and developed deep learning models for healthcare solutions

</div>
</div>


# 📝 Publications 


<div class='paper-box'><div class='paper-box-image'><div><div class="badge">WACV 2026</div><img src='https://i.postimg.cc/ZqG6Vnmt/Screenshot-2025-11-09-at-2-27-56-PM.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Power of Boundary and Reflection: Semantic Transparent Object Segmentation using Pyramid Vision Transformer with Transparent Cues](https://transcues.hkustvgd.com/)

Tuan-Anh Vu, **Nguyen Truong Hai**, Zheng Ziqiang, Binh-Son Hua, Qing Guo, Ivor Tsang, Sai-Kit Yeung

[**Project**](https://transcues.hkustvgd.com/) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- TransCues introduces an efficient transformer-based segmentation architecture capable of handling transparent, reflective, and general objects. By proposing Boundary Feature Enhancement (BFE) and Reflection Feature Enhancement (RFE), we enable the model to better capture subtle details in both glass and non-glass regions, resulting in more accurate and robust segmentation.

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">WACV 2025</div><img src='https://vatex.hkustvgd.com/static/images/teaser.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Vision-Aware Text Features in Referring Expression Segmentation: From Object Understanding to Context Understanding ](https://openaccess.thecvf.com/content/WACV2025/html/Nguyen-Truong_Vision-Aware_Text_Features_in_Referring_Image_Segmentation_From_Object_Understanding_WACV_2025_paper.html)

**Hai Nguyen-Truong**, E-Ro Nguyen, Tuan-Anh Vu, Minh-Triet Tran, Binh-Son Hua, Sai-Kit Yeung

[**Project**](https://vatex.hkustvgd.com/) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- VATEX is a novel method for referring image segmentation that leverages vision-aware text features to improve text understanding. By decomposing language cues into object and context understanding, the model can better localize objects and interpret complex sentences, leading to significant performance gains.
</div>
</div>

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">ISBI 2022</div><img src='https://raw.githubusercontent.com/itruonghai/SegTransVAE/refs/heads/main/figure/SegTransVAE.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[SegTransVAE: Hybrid CNN - Transformer with Regularization for medical image segmentation](https://ieeexplore.ieee.org/document/9761417)

**Hai Nguyen-Truong**, Quan-Dung Pham, Nam Nguyen Phuong, Khoa NA Nguyen, Chanh DT Nguyen, Trung Bui, Steven QH Truong

[**Project**](https://ieeexplore.ieee.org/document/9761417) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- SegTransVAE is the first work exploiting the hybrid architecture between CNN, Transformers with the Variational Autoencoder (VAE) branch to the network to reconstruct the input images jointly with segmentation.
</div>
</div>


# 🎖 Honors and Awards

<div class='award-box'>
<div class='award-box-text' markdown="1">

## Academic Excellence
- *2025* **Best Poster Presentation Award** at [AVSTC](https://avstc.ptit.edu.vn/) - Joint recognition from Australian Government, University of Technology Sydney (UTS), and PTIT.
- *2024* 🎓 **UGC Research Travel Grant** - HKUST Hong Kong
- *2022 - 2024* 💰 **Postgraduate Scholarship (PGS)** - HKUST Hong Kong
- *2022* 🏅 **Merit Award for Highest Distinction** - President of Vietnam National University
- *2022* 🥉 **Third Prize, EURÉKA** - Student Scientific Research Award, Vietnam
- *2021* 🏆 **Merit Award for Excellence in AI Research** - Ho Chi Minh Government
- *2017, 2018, 2020, 2021* 🌟 **Odon Vallet Scholarship** - Vietnam
<!-- ## Research Recognition -->


## Mathematical Achievement
- *2017 & 2018* 🥉 **Third Prize** - Vietnamese Mathematics Olympiads
- *2015 & 2016* 🥇 **Gold Medal** - April 30th Traditional Mathematics Olympiad
- *2016* 📚 **Merit Award for Excellence** - Minister of Education
- *2015* 🌟 **Merit Award** - Ho Chi Minh Young Pioneer Organization

</div>
</div>

# 🏆 Challenges and Competitions

<div class='competition-box'>
<div class='competition-box-text' markdown="1">

## International Recognition
- *2023 & 2024* 🥈 **Runner-up** - Maritime Computer Vision Workshop (WACV), Hawaii
- *2020* 🥇 **First Prize** - MediaEval 2021 Sports Video Classification, Europe

## National Achievements
- *2021* 🥇 **First Prize** - Ho Chi Minh AI Challenge (Scene Text Recognition)
- *2021* 🥉 **Third Prize** - AI4VN Hackathon (City Problem Classification)
- *2020* 🥈 **Runner-up** - Zalo AI Challenge (Traffic Sign Detection)

</div>
</div>
