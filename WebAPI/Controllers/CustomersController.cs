using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using DataAccessLayer;
using DataModel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace WebAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        public IConfiguration ProjectConfiguration { get; set; }
        public ICustomerRepository CustomerRepository { get; set; }

        public CustomersController(IConfiguration configuration, ICustomerRepository customerRepository)
        {
            ProjectConfiguration = configuration;
            CustomerRepository = customerRepository;
        }

        /// <summary>
        /// Get - Gets all customers
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public List<Customer> Get()
        {
            return CustomerRepository.GetAllCustomers();
        }

        // GET: api/Customers/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Customers
        [HttpPost]
        public bool Post([FromBody] Customer customer)
        {
            return CustomerRepository.Add(customer);
        }

        // PUT: api/Customers/5
        [HttpPut]
        public bool Put([FromBody] Customer customer)
        {
            return CustomerRepository.Edit(customer);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return CustomerRepository.Delete(id);
        }
    }
}
