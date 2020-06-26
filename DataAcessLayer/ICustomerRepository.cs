using System;
using System.Collections.Generic;
using System.Linq;
using DataModel;

namespace DataAccessLayer
{
    public interface ICustomerRepository
    {
        List<Customer> GetAllCustomers();
        List<Customer> GetCustomersByFirstName(string FirstName);
        Customer GetCustomerById(int id);
        bool Add(Customer Customer);
        bool Edit(Customer Customer);
        bool Delete(int id);
    }
}
