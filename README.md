# EdgeAutoMicrosoft Rewards Auto Search 🌟  

### 📈 Automate Microsoft Rewards searches directly within Edge!  

EdgeAutoMicrosoft is a lightweight browser extension designed to handle your Bing searches automatically, helping you earn Microsoft Rewards effortlessly.  

---

## 🖼️ Preview  

![Screenshot 2024-11-19 144600](https://github.com/user-attachments/assets/1123d6b2-a5a2-487f-a057-afb48a754b3b)


![Extension Demo](https://user-images.githubusercontent.com/placeholder/demo.gif)  
*The extension automating searches in real-time!*  

---

## 🚀 Features  

- 🔍 **Automated Searches**: Perform Bing searches automatically to earn Microsoft Rewards points.  
- 🖥️ **Desktop and Mobile Modes**: Switch between modes to maximize points.  
- 🕶️ **Stealth Mode**: Configurable delays to mimic human-like behavior.  
- 🌈 **Customizable Search Terms**: Add your own keyword list.  
- 🔒 **Privacy First**: Your data stays local—no external server calls.  

---

## 🛠️ Installation  

1. **Download the Extension**  
   - Clone this repository:  
     ```bash  
     git clone https://github.com/your-repo-name/EdgeAutoMicrosoftRewards.git  
     ```  

2. **Load the Extension into Edge**:  
   - Open Edge and navigate to `edge://extensions`.  
   - Enable *Developer Mode*.  
   - Click *Load unpacked* and select the project folder.  

3. **Start Using It**:  
   - Open the extension's popup.  
   - Configure your preferences (search term lists, delays, etc.).  
   - Hit "Start"!  

---

## ⚙️ How It Works  

1. The extension utilizes Edge's Web APIs to perform searches automatically.  
2. Simulates human-like browsing behavior with randomized delays and interactions.  
3. Tracks progress to ensure you hit your daily search cap.  

---

## 📄 Code Snippet  

Here’s a peek at the core automation logic:  

```javascript  
function performSearch(searchTerm) {  
    const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(searchTerm)}`;  
    chrome.tabs.create({ url: searchUrl });  

    setTimeout(() => {  
        chrome.tabs.remove(); // Close the tab after a delay.  
    }, getRandomDelay());  
}  

function getRandomDelay() {  
    return Math.floor(Math.random() * (5000 - 3000 + 1)) + 3000; // Delay between 3-5 seconds.  
}  
