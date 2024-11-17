const achievementsData = [
    {
      title: "Força Sobre-Humana",
      description: "Complete treinos de bíceps por mais de 500 vezes no total.",
      levels: [125, 250, 375, 500],
      imagePath: "assets/images/blank_medal.png",
      bronzePath: "assets/images/bronze_medal.png",
      silverPath: "assets/images/silver_medal.png",
      goldPath: "assets/images/gold_medal.png",
      pumpPath: "assets/images/pump_medal.png",
    },
    {
      title: "Força Nível Nêmesis",
      description: "Alcance um novo recorde de peso na rosca direta.",
      levels: [5, 15, 25, 30],
      imagePath: "assets/images/blank_medal.png",
      bronzePath: "assets/images/bronze_medal.png",
      silverPath: "assets/images/silver_medal.png",
      goldPath: "assets/images/gold_medal.png",
      pumpPath: "assets/images/pump_medal.png",
    },
    // Novas conquistas adicionadas:
    {
      title: "100 Agachamentos",
      description: "Melhore suas pernas chegando ao mesmo número de agachamentos diários que o Saitama.",
      levels: [25, 50, 75, 100],
      imagePath: "assets/images/blank_medal.png",
      bronzePath: "assets/images/bronze_medal.png",
      silverPath: "assets/images/silver_medal.png",
      goldPath: "assets/images/gold_medal.png",
      pumpPath: "assets/images/pump_medal.png",
    },
    {
        title: "Super soldado dos abdominais",
        description: "Mantenha a prancha por um total de 1 hora no mesmo dia.",
        levels: [20, 40, 50, 60],
        imagePath: "assets/images/blank_medal.png",
        bronzePath: "assets/images/bronze_medal.png",
        silverPath: "assets/images/silver_medal.png",
        goldPath: "assets/images/gold_medal.png",
        pumpPath: "assets/images/pump_medal.png",
      },
    {
      title: "Pernas de Rock Lee",
      description: "Alcance um novo recorde de peso no leg press.",
      levels: [75, 150, 225, 300],
      imagePath: "assets/images/blank_medal.png",
      bronzePath: "assets/images/bronze_medal.png",
      silverPath: "assets/images/silver_medal.png",
      goldPath: "assets/images/gold_medal.png",
      pumpPath: "assets/images/pump_medal.png",
    }
  ];
  
  function createAchievement(id, title, description, levels, imagePath, bronzePath, silverPath, goldPath, pumpPath) {
    return `
      <div class="col-12 col-md-4 achievement">
        <img id="image-${id}" src="${imagePath}" alt="Medalha ${title}" class="circle-img mb-2" onclick="updateProgress('${id}', ${levels}, '${bronzePath}', '${silverPath}', '${goldPath}', '${pumpPath}')">
        <p class="fs-4">${title}</p>
        <p class="fs-6">${description}</p>
        <p id="progress-${id}" class="fs-3">Treinos realizados: 0</p>
      </div>
    `;
  }
  
  function updateProgress(id, levels, bronzePath, silverPath, goldPath, pumpPath) {
    const progressElem = document.getElementById(`progress-${id}`);
    const imageElem = document.getElementById(`image-${id}`);
    let currentCount = parseInt(progressElem.textContent.match(/\d+/)[0], 10);
  
    currentCount++;
    progressElem.textContent = `Treinos realizados: ${currentCount}`;
  
    if (currentCount >= levels[3]) {
      imageElem.src = pumpPath;
    } else if (currentCount >= levels[2]) {
      imageElem.src = goldPath;
    } else if (currentCount >= levels[1]) {
      imageElem.src = silverPath;
    } else if (currentCount >= levels[0]) {
      imageElem.src = bronzePath;
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('achievementsContainer');
    container.innerHTML = '';  // Limpar o conteúdo do container antes de adicionar as novas conquistas
    achievementsData.forEach((achievement, index) => {
      container.innerHTML += createAchievement(
        index + 1,
        achievement.title,
        achievement.description,
        achievement.levels,
        achievement.imagePath,
        achievement.bronzePath,
        achievement.silverPath,
        achievement.goldPath,
        achievement.pumpPath
      );
    });
  });
  