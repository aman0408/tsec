App = {
  loading: false,
    contracts: {},
  
    load: async () => {
      await App.loadWeb3()
      await App.loadAccount()
      await App.loadContract()
      await App.render()
    },
    loadWeb3: async () => {
      if (typeof web3 !== 'undefined') {
        App.web3Provider = web3.currentProvider
        web3 = new Web3(web3.currentProvider)
      } else {
        window.alert("Please connect to Metamask.")
      }
      // Modern dapp browsers...
      if (window.ethereum) {
        window.web3 = new Web3(ethereum)
        try {
          // Request account access if needed
          await ethereum.enable()
          // Acccounts now exposed
          web3.eth.sendTransaction({/* ... */})
        } catch (error) {
          // User denied account access...
        }
      }
      // Legacy dapp browsers...
      else if (window.web3) {
        App.web3Provider = web3.currentProvider
        window.web3 = new Web3(web3.currentProvider)
        // Acccounts always exposed
        web3.eth.sendTransaction({/* ... */})
      }
      // Non-dapp browsers...
      else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
      }
    },loadAccount: async () => {
      // Set the current blockchain account
      App.account = web3.eth.accounts[0]
    },
  
    loadContract: async () => {
      // Create a JavaScript version of the smart contract
      const hrProcess = await $.getJSON('HRProcess.json')
      App.contracts.HRProcess = TruffleContract(hrProcess)
      App.contracts.HRProcess.setProvider(App.web3Provider)
  
      // Hydrate the smart contract with values from the blockchain
      App.hrProcess = await App.contracts.HRProcess.deployed()
    },
    render: async () => {

    if(App.loading){
      return;
    }
    App.setLoading(true);

    await App.renderTasks()
    App.setLoading(false);
  },
  renderTasks: async() =>{
    const jobSeekerCount=await App.hrProcess.seekerCount();
    const $seekerTemplate = $('.seekerTemp')
  
      // Render out each task with a new task template
      for (var i = 1; i <= jobSeekerCount; i++) {
        // Fetch the task data from the blockchain
        const task = await App.hrProcess.allJobSeekers(i)
        const taskId = task[0].toNumber()
        const taskContent = task[1]
        console.log(taskContent)
  
        // Create the html for the task
        const $newSeekerTemplate = $seekerTemplate.clone()
        $newSeekerTemplate.find('.content').html(taskContent)
        // $newTaskTemplate.find('input')
        //                 .prop('name', taskId)
        //                 .prop('checked', taskCompleted)
        //                 .on('click', App.toggleCompleted)
  
        // Put the task in the correct list
       
        $('#seekerList').append($newSeekerTemplate)
        
      
  
        // Show the task
        $newSeekerTemplate.show()
      }
    // const $seekerCount = $('#')
    // console.log(jobSeekerCount);
    // var jobSeekersList = $("#jobSeekersList");
    // jobSeekersList.text("helo")
    // jobSeekersList.empty();

    // for(var i=1;i<jobSeekerCount;i++){
    //   const jobSeeker=await App.hrProcess.allJobSeekers(i);
    //   var id=jobSeeker[0];
    //   var name=jobSeeker[1];
    //   console.log(id)
    //   var jobSeekerTemplate = "<tr><th>" + id + "</th><td>" + name + "</td></tr>";
    //   jobSeekersList.append(jobSeekerTemplate);
    // }
  }, setLoading: (boolean) => {
    App.loading = boolean
    const loader = $('#loader')
    const content = $('#content')
    if (boolean) {
      loader.show()
      content.hide()
    } else {
      loader.hide()
      content.show()
    }
  }
};
    // var hrProcessInstance;
    // var loader = $("#loader");
    // var content = $("#content");

    // loader.show();
    // content.hide();

    // Load account data
    // web3.eth.getCoinbase(function(err, account) {
    //   if (err === null) {
    //     App.account = account;
    //     $("#accountAddress").html("Your Account: " + account);
    //   }
    // });

    // Load contract data
    // App.contracts.HRProcess.deployed().then(function(instance) {
    //   hrProcessInstance = instance;
    //   console.log(instance);
    //   return hrProcessInstance.allJobSeekers();
    // }).then(function(allJobSeekers) {
    //   console.log("cont"+allJobSeekers);

    //   var jobSeekersList = $("#jobSeekersList");
    //   jobSeekersList.empty();
    //   var candidatesSelect = $('#candidatesSelect');
    //   candidatesSelect.empty();

    //   for (var i = 1; i <= allJobSeekeresCount; i++) {
    //     hrProcessInstance.candidates(i).then(function(jobSeeker) {
    //       var id = jobSeeker[0];
    //       var name = jobSeeker[1];
  

    //       // Render candidate Result
    //       var jobSeekerTemplate = "<tr><th>" + id + "</th><td>" + name + "</td></tr>"
    //       jobSeekersList.append(jobSeekerTemplate);

    //       // Render candidate ballot option
    //       // var candidateOption = "<option value='" + id + "' >" + name + "</ option>"
    //       // candidatesSelect.append(candidateOption);
    //     });
    //   }
    //   console.log(App.account);
    //   return hrProcessInstance.uploadedJobSeekers(App.account);
    // }).then(function(hasUploaded) {
    //   // Do not allow a user to vote
    //   if(hasUploaded) {
        
    //   }
    //   console.log("sdfv"+hasUploaded);
    //   loader.hide();
    //   content.show();
    // }).catch(function(error) {
    //   // console.warn(error);
    // });
  

//   castVote: function() {
//     var candidateId = $('#candidatesSelect').val();
//     App.contracts.Election.deployed().then(function(instance) {
//       return instance.vote(candidateId, { from: App.account });
//     }).then(function(result) {
//       // Wait for votes to update
//       $("#content").hide();
//       $("#loader").show();
//     }).catch(function(err) {
//       console.error(err);
//     });
//   }
// };
// window.addEventListener('load', async () => {
//   // Modern dapp browsers...
//   if (window.ethereum) {
//       window.web3 = new Web3(ethereum);
//       console.log("12334");
//       try {
//           // Request account access if needed
//           await ethereum.enable();
//           // Acccounts now exposed
//           // console.log(ethereum.)
//       } catch (error) {
//           // User denied account access...
//       }
//   }
//   // Legacy dapp browsers...
//   else if (window.web3) {
//       window.web3 = new Web3(web3.currentProvider);
//       // Acccounts always exposed
//       // web3.eth.sendTransaction({/* ... */});
//   }
//   // Non-dapp browsers...
//   else {
//       console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
//   }
// });

$(() => {
  $(window).load(() => {
    App.load()
  })
})