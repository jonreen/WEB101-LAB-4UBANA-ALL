let packages = [];

document.getElementById('packageForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const id = document.getElementById('id').value;
  const destination = document.getElementById('destination').value;
  const weight = parseFloat(document.getElementById('weight').value);
  const status = document.getElementById('status').value;

  packages.push({ id, destination, weight, status });
  displayOutput(`✅ Package ${id} added.`);
  this.reset();
});

function runAction() {
  const action = document.getElementById('actionSelector').value;
  switch (action) {
    case 'totalWeight':
      calculateTotalWeight();
      break;
    case 'filterStatus':
      const status = prompt("Enter status to filter (e.g., Delivered):");
      filterByStatus(status);
      break;
    case 'heaviest':
      findHeaviestPackage();
      break;
    case 'groupDestination':
      groupByDestination();
      break;
    case 'fetchNew':
      fetchNewPackages();
      break;
    default:
      displayOutput("⚠️ Please select a valid action.");
  }
}

function displayOutput(data) {
  document.getElementById('output').textContent = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
}

function calculateTotalWeight() {
  const total = packages.reduce((sum, pkg) => sum + pkg.weight, 0);
  displayOutput(`Total Weight: ${total.toFixed(2)} kg`);
}

function filterByStatus(status) {
  const filtered = packages.filter(pkg => pkg.status.toLowerCase() === status.toLowerCase());
  displayOutput(filtered.length ? filtered : `No packages with status "${status}"`);
}

function findHeaviestPackage() {
  if (packages.length === 0) return displayOutput("No packages available.");
  const heaviest = packages.reduce((max, pkg) => pkg.weight > max.weight ? pkg : max, packages[0]);
  displayOutput(heaviest);
}

function groupByDestination() {
  const grouped = packages.reduce((acc, pkg) => {
    acc[pkg.destination] = acc[pkg.destination] || [];
    acc[pkg.destination].push(pkg);
    return acc;
  }, {});
  displayOutput(grouped);
}

function fetchNewPackages() {
  displayOutput("⏳ Fetching new packages...");
  setTimeout(() => {
    const newPackages = [
      { id: 'PKG005', destination: 'Tacloban', weight: 10.1, status: 'In Transit' },
      { id: 'PKG006', destination: 'Manila', weight: 6.3, status: 'Delivered' },
    ];
    packages = [...packages, ...newPackages];
    displayOutput("✅ New packages added:\n" + JSON.stringify(newPackages, null, 2));
  }, 1500);
}