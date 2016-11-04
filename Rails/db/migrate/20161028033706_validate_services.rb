class ValidateServices < ActiveRecord::Migration[5.0]
  def up
  	
 	change_column_null :services, :name, false

 	#prices and duration and description can be null

 	change_column :services, :price_small, :decimal, :precision => 10, :scale => 2 #2 decimal points and 10 digits in total

 	change_column :services, :price_large, :decimal, :precision => 10, :scale => 2

 	change_column :services, :duration, :decimal, :precision => 10, :scale => 2
  	
  end
  
  def down
 	change_column_null :services, :name, true

 	change_column :services, :price_small, :decimal, :precision => nil, :scale => nil 

 	change_column :services, :price_large, :decimal, :precision => nil, :scale => nil

 	change_column :services, :duration, :decimal, :precision => nil, :scale => nil
  	
  end
end
