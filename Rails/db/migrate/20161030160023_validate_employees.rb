class ValidateEmployees < ActiveRecord::Migration[5.0]
 def up
    # note that there are additional checks in the model

  	#Clients requested non of the fields be compulsory

 	  add_index :employees, :email, unique: true

 	  change_column :employees, :phone_number, :string, :limit => 12

  	change_column :employees, :street_number, :integer

  	change_column :employees, :postal_code, :string, :limit => 7

  	change_column :employees, :start_date, :date, :default => Date.today

    change_column :employees, :is_admin, :boolean, :default => false
	end
  
  def down

  	remove_index :employees, column: :email

  	change_column :employees, :phone_number, :string, :limit => nil
  	
  	change_column :employees, :postal_code, :string, :limit => nil

  	change_column :employees, :start_date, :date, :default => nil

  	change_column :employees, :is_admin, :boolean, :default => nil
  end
end
