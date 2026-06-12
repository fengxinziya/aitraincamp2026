const trackTabs = document.querySelectorAll(".track-tab");
const trackPanels = document.querySelectorAll(".track-panel");
const timeline = document.querySelector(".timeline");

const schedules = {
  product: [
    ["Day 1", "快速启动，进入开发", "破冰、产品思维、快速选题，下午直接搭建产品基础框架。"],
    ["Day 2", "全天开发，持续迭代", "完善核心功能、同伴试用、收集反馈，并进行AI视觉包装。"],
    ["Day 3", "产品收尾，正式路演", "修复问题、提炼亮点、制作演示PPT，面向家长展示作品。"]
  ],
  animation: [
    ["Day 1", "故事构思，分镜出图", "完成主题、剧本、角色设定和关键镜头画面。"],
    ["Day 2", "视频生成，剪辑初稿", "用AI图生视频，加入配音、配乐、转场和字幕。"],
    ["Day 3", "作品精修，正式展映", "完成最终导出，准备创作说明并进行作品展映。"]
  ]
};

function renderSchedule(track) {
  timeline.innerHTML = schedules[track]
    .map(([day, title, body]) => `
      <article>
        <span>${day}</span>
        <h3>${title}</h3>
        <p>${body}</p>
      </article>
    `)
    .join("");
}

trackTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const track = tab.dataset.track;

    trackTabs.forEach((item) => {
      const active = item === tab;
      item.classList.toggle("is-active", active);
      item.setAttribute("aria-selected", String(active));
    });

    trackPanels.forEach((panel) => {
      const active = panel.dataset.panel === track;
      panel.hidden = !active;
      panel.classList.toggle("is-active", active);
    });

    renderSchedule(track);
  });
});

const activityTrack = document.querySelector(".activity-track");
const carouselButtons = document.querySelectorAll("[data-carousel]");

carouselButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!activityTrack) return;

    const direction = button.dataset.carousel === "next" ? 1 : -1;
    const distance = Math.max(activityTrack.clientWidth * 0.82, 260);
    activityTrack.scrollBy({
      left: direction * distance,
      behavior: "smooth"
    });
  });
});

document.querySelectorAll("[data-scroll-prev], [data-scroll-next]").forEach((button) => {
  button.addEventListener("click", () => {
    const card = button.closest(".prototype-shot");
    const track = card?.querySelector(".prototype-track");
    if (!track) return;

    const direction = button.hasAttribute("data-scroll-next") ? 1 : -1;
    track.scrollBy({
      left: direction * Math.max(track.clientWidth, 260),
      behavior: "smooth"
    });
  });
});
